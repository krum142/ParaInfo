using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Reserve;
using Services.Services.Data.Interfaces;

namespace ParaInfo.Web.Controllers
{
    public class ReserveController : ApiController
    {
        private readonly IProductsService<Reserve> productsService;

        public ReserveController(IProductsService<Reserve> productsService)
        {
            this.productsService = productsService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var projection = Builders<Reserve>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand)
                .Include(x => x.Views);

            return Json(await productsService.GetAllAsync(projection));
        }


        [HttpGet("{brand}")]
        public async Task<IActionResult> Get(string brand)
        {
            var projection = Builders<Reserve>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand)
                .Include(x => x.Views);

            return Json(await productsService.GetAllAsync(
                projection,
                x => x.Brand.ToLower() == brand.ToLower()));
        }

        [HttpGet("{brand}/{model}")]
        public async Task<IActionResult> Get(string brand, string model)
        {
            var reserve = await productsService.FindOneAsync(x =>
            x.Brand.ToLower() == brand.ToLower() &&
            x.Model.ToLower() == model.ToLower());

            if (reserve == null) return Json(new { });

            await productsService.AddViewAsync(reserve);
            return this.Json(reserve);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm] AddReserveModel input)
        {
            var reserve = new Reserve()
            {
                Brand = input.Brand,
                Model = input.Model,
                Description = input.Description,
                Price = input.Price,
                Sizes = input.Sizes
            };

            var result = await productsService.CreateAsync(reserve,input.File);

            if (result == null) return Json(new { });

            return Json(result);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromForm] UpdateReserveModel input)
        {
            var reserve = new Reserve()
            {
                Id = input.Id,
                Brand = input.Brand,
                Model = input.Model,
                Description = input.Description,
                Price = input.Price,
                Sizes = input.Sizes
            };

            var result = await productsService.UpdateAsync(reserve, input.File);

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