using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParaInfo.Web.ApiModels.Paraglider;
using Services.Services.Data.Interfaces;

namespace ParaInfo.Web.Controllers
{
    public class ReserveController : ApiController
    {

        public ReserveController()
        {
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            // return Json(await paragliderService.GetAllFilteredAsync());
            return Ok();
        }


        [HttpGet("{brand}")]
        public async Task<IActionResult> Get(string brand)
        {
           // return Json(await paragliderService.GetAllByBrandFilteredAsync(brand));
           return Ok();
        }

        [HttpGet("{brand}/{model}")]
        public async Task<IActionResult> Get(string brand, string model)
        {
            //var paraglider = await paragliderService.GetByModelAndBrandAsync(brand, model);
            //if (paraglider != null)
            //{
            //    return this.Json(paraglider);
            //}

            //return Json(new { });
            return Ok();

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm] AddParagliderModel input)
        {
            //var result = await paragliderService.CreateAsync(input);
            //if (result == null)
            //{
            //    return Json(new { });
            //}
            //return Json(result);
            return Ok();

        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromForm] UpdateParagliderModel input)
        {
            //var result = await paragliderService.UpdateAsync(input);
            //if (result == null)
            //{
            //    return Json(new { });
            //}
            //return Json(result);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            // return Json(await paragliderService.DeleteAsync(id));
            return Ok();
        }
    }
}