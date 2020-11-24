
using System.Linq;
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
        public async Task<IActionResult> Get()
        {
            return Json(await itemService.GetAllAsync());
        }

        
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Json(await itemService.GetByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post(Paraglider model)
        {
            return Json(await itemService.CreateAsync(model));
        }

        [HttpPut]
        public async Task<IActionResult> Put(Paraglider model)
        {
            return Json(await itemService.UpdateAsync(model));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Paraglider model)
        {
           return Json(await itemService.DeleteAsync(model.Id));
        }
    }
}
