using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Assesoar;
using Services.Services.Data.Interfaces;

namespace ParaInfo.Web.Controllers
{
    public class AccessoryController : ApiController
    {
        private IProductsService<Accessory> productsService;

        public AccessoryController(IProductsService<Accessory> productsService)
        {
            this.productsService = productsService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await productsService.GetAllAsync());
        } 


        [HttpGet("{brand}")]
        public async Task<IActionResult> Get(string brand)
        {
            var projection = Builders<Accessory>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand);

            return Json(await productsService.GetAllAsync(
                projection,
                x => x.Brand.ToLower() == brand.ToLower()));
        }

        [HttpGet("{brand}/{model}")]
        public async Task<IActionResult> Get(string brand, string model)
        {
            var assessor = await productsService
                .FindOneAsync(x =>
                    x.Model.ToLower() == model.ToLower() &&
                    x.Brand.ToLower() == brand.ToLower());

            if (assessor == null) return this.Json(new { });

            await productsService.AddViewAsync(assessor);

            return this.Json(assessor);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm] AddAccesoarModel input)
        {
            var accessory = new Accessory()
            {
                Brand = input.Brand,
                Model = input.Model,
                Price = input.Price,
                Description = input.Description
            };

            var result = await productsService.CreateAsync(accessory, input.File);

            if (result == null) return Json(new { });

            return Json(result);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromForm] UpdateAccessoarModel input)
        {
            var accessory = new Accessory()
            {
                Id = input.Id,
                Brand = input.Brand,
                Model = input.Model,
                Price = input.Price,
                Description = input.Description
            };

            var result = await productsService.UpdateAsync(accessory,input.File);

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