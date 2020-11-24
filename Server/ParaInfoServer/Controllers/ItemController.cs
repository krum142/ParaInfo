
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Parainfo.Data.Models;
using Services.Services.Data.Interfaces;
using System.Threading.Tasks;


namespace ParaInfoServer.Controllers
{
    public class ItemController : ApiController
    {
        private readonly IItemsService<Paraglider> itemService;

        public ItemController(IItemsService<Paraglider> itemService)
        {
            this.itemService = itemService;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            var user = this.User;
            return Ok("ItWorks");
        }

        [HttpPost]
        public async Task<IActionResult> Post(Paraglider model)
        {
            return Json(await itemService.CreateAsync(model));
        }

        [HttpPut]
        public async Task<IActionResult> Put(Paraglider model)
        {
            await itemService.UpdateAsync(model);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Delete(Paraglider model)
        {
           await itemService.DeleteAsync(model.Id.ToString());
           return Ok();
        }
    }
}
