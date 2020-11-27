using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Parainfo.Data.Models;
using Services.Services.Data.Interfaces;

namespace ParaInfoServer.Controllers
{
    public class BrandController : ApiController
    {
        private readonly IItemsService<Brand> itemService;

        public BrandController(IItemsService<Brand> itemService)
        {
            this.itemService = itemService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await itemService.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Json(await itemService.GetByIdAsync(id));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(Brand model)
        {
            return Json(await itemService.CreateAsync(model));
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put(Brand model)
        {
            return Json(await itemService.UpdateAsync(model));
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> Delete(Brand model)
        {
            return Json(await itemService.DeleteAsync(model.Id));
        }
    }
}
