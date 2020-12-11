using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParaInfo.Web.ApiModels.Assesoar;
using Services.Services.Data.Interfaces;

namespace ParaInfo.Web.Controllers
{
    public class AccessoryController : ApiController
    {
        private readonly IAccessoaryService accessoryService;

        public AccessoryController(IAccessoaryService accessoryService)
        {
            this.accessoryService = accessoryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await accessoryService.GetAllFilteredAsync());
        } 


        [HttpGet("{brand}")]
        public async Task<IActionResult> Get(string brand)
        {
            return Json(await accessoryService.GetAllByBrandFilteredAsync(brand));
        }

        [HttpGet("{brand}/{model}")]
        public async Task<IActionResult> Get(string brand, string model)
        {
            var paraglider = await accessoryService.GetByModelAndBrandAsync(brand, model);
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
            var result = await accessoryService.CreateAsync(input);
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
            var result = await accessoryService.UpdateAsync(input);
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
            return Json(await accessoryService.DeleteAsync(id));
        }
    }
}