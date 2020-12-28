using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Harness;
using Services.Services.Data.Interfaces;

namespace ParaInfo.Web.Controllers
{
    public class HarnessController : ApiController
    {
        private readonly IProductsService<Harness> productService;

        public HarnessController(IProductsService<Harness> productsService)
        {
            this.productService = productsService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await productService.GetAllAsync());
        }

        [HttpGet("{brand}")]
        public async Task<IActionResult> Get(string brand)
        {
            var projection = Builders<Harness>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand);

            return Json(await productService.GetAllAsync(
                projection,
                x => x.Brand.ToLower() == brand.ToLower()));
        }

        [HttpGet("{brand}/{model}")]
        public async Task<IActionResult> Get(string brand, string model)
        {
            var harness = await productService.FindOneAsync(x =>
                x.Brand.ToLower() == brand.ToLower() &&
                x.Model.ToLower() == model.ToLower());

            if (harness != null)
            {
                await productService.AddViewAsync(harness);
                return this.Json(harness);
            }

            return Json(new { });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm] AddHarnessModel input)
        {
            var harness = new Harness()
            {
                Brand = input.Brand,
                Description = input.Description,
                Model = input.Model,
                Sizes = input.Sizes,
                Price = input.Price
            };

            var result = await productService.CreateAsync(harness,input.File);

            if (result == null)
            {
                return Json(new { });
            }

            return Json(result);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromForm] UpdateHarnessModel input)
        {
            var harness = new Harness()
            {
                Id = input.Id,
                Brand = input.Brand,
                Description = input.Description,
                Model = input.Model,
                Sizes = input.Sizes,
                Price = input.Price
            };

            var result = await productService.UpdateAsync(harness, input.File);

            if (result == null) return Json(new { });

            return Json(result);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return Json(await productService.DeleteAsync(id));
        }
    }
}