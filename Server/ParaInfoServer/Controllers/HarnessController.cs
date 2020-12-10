using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParaInfo.Web.ApiModels.Harness;
using Services.Services.Data.Interfaces;

namespace ParaInfo.Web.Controllers
{
    public class HarnessController : ApiController
    {
        private readonly IHarnessService harnessService;

        public HarnessController(IHarnessService harnessService)
        {
            this.harnessService = harnessService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await harnessService.GetAllFilteredAsync());
        }


        [HttpGet("{brand}")]
        public async Task<IActionResult> Get(string brand)
        {
            return Json(await harnessService.GetAllByBrandFilteredAsync(brand));
        }

        [HttpGet("{brand}/{model}")]
        public async Task<IActionResult> Get(string brand, string model)
        {
            var harness = await harnessService.GetByModelAndBrandAsync(brand, model);
            if (harness != null)
            {
                return this.Json(harness);
            }

            return Json(new { });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm] AddHarnessModel input)
        {
            var result = await harnessService.CreateAsync(input);
            if (result == null)
            {
                return Json(new { });
            }
            return Json(result);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromForm] UpdateHarnessModel input)
        {
            var result = await harnessService.UpdateAsync(input);
            if (result == null)
            {
                return Json(new { });
            }
            return Json(result);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return Json(await harnessService.DeleteAsync(id));
        }
    }
}