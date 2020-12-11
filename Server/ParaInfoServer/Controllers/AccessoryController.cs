using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParaInfo.Web.ApiModels.Assesoar;
using Services.Services.Data.Interfaces;

namespace ParaInfo.Web.Controllers
{
    public class AccessoryController : ApiController
    {
        private readonly IAccessoaryService accessoaryService;

        public AccessoryController(IAccessoaryService accessoaryService)
        {
            this.accessoaryService = accessoaryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await accessoaryService.GetAllFilteredAsync());
        }


        [HttpGet("{brand}")]
        public async Task<IActionResult> Get(string brand)
        {
            return Json(await accessoaryService.GetAllByBrandFilteredAsync(brand));
        }

        [HttpGet("{brand}/{model}")]
        public async Task<IActionResult> Get(string brand, string model)
        {
            var paraglider = await accessoaryService.GetByModelAndBrandAsync(brand, model);
            if (paraglider != null)
            {
                return this.Json(paraglider);
            }

            return Json(new { });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm] AddAccesoarModel input)
        {
            var result = await accessoaryService.CreateAsync(input);
            if (result == null)
            {
                return Json(new { });
            }
            return Json(result);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromForm] UpdateAccessoarModel input)
        {
            var result = await accessoaryService.UpdateAsync(input);
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
            return Json(await accessoaryService.DeleteAsync(id));
        }
    }
}