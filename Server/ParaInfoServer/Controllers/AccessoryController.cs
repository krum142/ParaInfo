using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Parainfo.Data.Common.Repositories;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Assesoar;
using Services.Services.Data.Interfaces;

namespace ParaInfo.Web.Controllers
{
    public class AccessoryController : ApiController
    {
        private readonly IAccessoaryService accessoryService;
        private IMongoRepository<Accessory> mongoDb;

        public AccessoryController(IAccessoaryService accessoryService,IMongoRepository<Accessory> mongoDb)
        {
            this.accessoryService = accessoryService;
            this.mongoDb = mongoDb;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await mongoDb.GetAllAsync());
        } 


        [HttpGet("{brand}")]
        public async Task<IActionResult> Get(string brand)
        {
            var projection = Builders<Accessory>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand);

            return Json(await mongoDb.GetAllFilteredAsync(x => x.Brand == brand, projection));
        }

        [HttpGet("{brand}/{model}")]
        public async Task<IActionResult> Get(string brand, string model)
        {
            var assessor = await mongoDb
                .FindOneAsync(x =>
                    x.Model.ToLower() == model.ToLower() &&
                    x.Brand.ToLower() == brand.ToLower());

            if (assessor == null) this.Json(new { });

            assessor.Views++;
            await mongoDb.ReplaceOneAsync(assessor);
            return this.Json(assessor);
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