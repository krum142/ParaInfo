using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParaInfo.Web.ApiModels.Paraglider;
using ParaInfo.Web.ApiModels.Reserve;
using Services.Services.Data.Interfaces;

namespace ParaInfo.Web.Controllers
{
    public class ReserveController : ApiController
    {
        private readonly IReserveService reserveService;

        public ReserveController(IReserveService reserveService)
        {
            this.reserveService = reserveService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await reserveService.GetAllFilteredAsync());
        }


        [HttpGet("{brand}")]
        public async Task<IActionResult> Get(string brand)
        {
            return Json(await reserveService.GetAllByBrandFilteredAsync(brand));
        }

        [HttpGet("{brand}/{model}")]
        public async Task<IActionResult> Get(string brand, string model)
        {
            var paraglider = await reserveService.GetByModelAndBrandAsync(brand, model);
            if (paraglider != null)
            {
                return this.Json(paraglider);
            }

            return Json(new { });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm] AddReserveModel input)
        {
            var result = await reserveService.CreateAsync(input);
            if (result == null)
            {
                return Json(new { });
            }
            return Json(result);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromForm] UpdateReserveModel input)
        {
            var result = await reserveService.UpdateAsync(input);
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
            return Json(await reserveService.DeleteAsync(id));
        }
    }
}