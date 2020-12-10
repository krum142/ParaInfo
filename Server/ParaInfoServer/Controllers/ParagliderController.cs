using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Paraglider;
using Services.Services.Data.Interfaces;

namespace ParaInfo.Web.Controllers
{
    public class ParagliderController : ApiController
    {
        private readonly IParagliderService paragliderService;

        public ParagliderController(IParagliderService paragliderService)
        {
            this.paragliderService = paragliderService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await paragliderService.GetAllFilteredAsync());
        }


        [HttpGet("{brand}")]
        public async Task<IActionResult> Get(string brand)
        {
            return Json(await paragliderService.GetAllByBrandFilteredAsync(brand));
        }

        [HttpGet("{brand}/{model}")]
        public async Task<IActionResult> Get(string brand, string model)
        {
            var paraglider = await paragliderService.GetByModelAndBrandAsync(brand, model);
            if (paraglider != null)
            {
                return this.Json(paraglider);
            }

            return Json(new { });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm]AddParagliderModel input)
        {
            var result = await paragliderService.CreateAsync(input);
            if (result == null)
            {
                return Json(new {});
            }
            return Json(result);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromForm]UpdateParagliderModel input)
        {
            var result =await paragliderService.UpdateAsync(input);
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
            return Json(await paragliderService.DeleteAsync(id));
        }
    }
}
