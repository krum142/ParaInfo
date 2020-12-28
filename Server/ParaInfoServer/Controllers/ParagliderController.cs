using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Paraglider;
using Services.Services.Data.Interfaces;

namespace ParaInfo.Web.Controllers
{
    public class ParagliderController : ApiController
    {
        private readonly IProductsService<Paraglider> productsService;

        public ParagliderController(IProductsService<Paraglider> productsService)
        {
            this.productsService = productsService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await productsService.GetAllAsync());
        }

        [HttpGet("count/{count}")]
        public async Task<IActionResult> GetOrderedAndLimited(int count)
        {
            var projection = Builders<Paraglider>.Projection
                .Include(p => p.Model)
                .Include(x => x.Brand)
                .Include(x => x.ImgUrl);

            return Json(await productsService.GetAllAsync(projection, x => x.Views, count));
        }

        [HttpGet("{brand}")]
        public async Task<IActionResult> Get(string brand)
        {
            var projection = Builders<Paraglider>.Projection
                .Include(p => p.Model)
                .Include(x => x.Brand)
                .Include(x => x.ImgUrl);

            return Json(await productsService.GetAllAsync(
                projection,
                x => x.Brand.ToLower() == brand.ToLower()));
        }

        [HttpGet("{brand}/{model}")]
        public async Task<IActionResult> Get(string brand, string model)
        {
            var paraglider = await productsService.FindOneAsync(x =>
            x.Brand.ToLower() == brand.ToLower() &&
            x.Model.ToLower() == model.ToLower());

            if (paraglider == null) return Json(new { });

            await productsService.AddViewAsync(paraglider);

            return this.Json(paraglider);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm] AddParagliderModel input)
        {
            var paraglider = new Paraglider()
            {
                Brand = input.Brand,
                Model = input.Model,
                Description = input.Description,
                Price = input.Price,
                Sizes = input.Sizes,
            };

            var result = await productsService.CreateAsync(paraglider, input.File);

            if (result == null) return Json(new { });

            return Json(result);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromForm] UpdateParagliderModel input)
        {
            var paraglider = new Paraglider()
            {
                Id = input.Id,
                Brand = input.Brand,
                Model = input.Model,
                Description = input.Description,
                Price = input.Price,
                Sizes = input.Sizes,
            };

            var result = await productsService.UpdateAsync(paraglider, input.File);

            if (result == null) return Json(new { });

            return Json(result);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return Json(await productsService.DeleteAsync(id));
        }
    }
}
