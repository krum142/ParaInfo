using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Parainfo.Data.Models;
using Services.Services.Data.Interfaces;

namespace ParaInfoServer.Controllers
{
    public class BrandController : ApiController
    {
        private readonly IBrandService brandService;

        public BrandController(IBrandService brandService)
        {
            this.brandService = brandService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await brandService.GetAllAsync());
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> Get(string name)
        {
            var brand = await brandService.GetByNameAsync(name);
            if (brand != null)
            {
                return this.Json(brand);
            }

            return this.NotFound();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(Brand model)
        {
            return Json(await brandService.CreateAsync(model));
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put(Brand model)
        {
            return Json(await brandService.UpdateAsync(model));
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> Delete(Brand model)
        {
            return Json(await brandService.DeleteAsync(model.Id));
        }
    }
}
