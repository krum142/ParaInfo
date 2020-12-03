using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Parainfo.Data.Models;
using Services.Services.Data.Interfaces;

namespace ParaInfoServer.Controllers
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
            return Json(await paragliderService.GetAllAsync());
        }

        [HttpGet("{model}")]
        public async Task<IActionResult> Get(string model)
        {
            var brand = await paragliderService.GetByModelAsync(model);
            if (brand != null)
            {
                return this.Json(brand);
            }

            return Json(new {});
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(Paraglider model)
        {
            return Json(await paragliderService.CreateAsync(model));
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put(Paraglider model)
        {
            return Json(await paragliderService.UpdateAsync(model));
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> Delete(Paraglider model)
        {
            return Json(await paragliderService.DeleteAsync(model.Id));
        }
    }
}
