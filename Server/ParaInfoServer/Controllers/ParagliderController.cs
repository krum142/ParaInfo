using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Parainfo.Data.Models;
using Parainfo.Data.Models.Identity;
using ParaInfo.Web.ApiModels.Paraglider;
using Services.Services.Data.Interfaces;

namespace ParaInfo.Web.Controllers
{
    public class ParagliderController : ApiController
    {
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IProductsService<Paraglider> productsService;

        public ParagliderController(
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IProductsService<Paraglider> productsService)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
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

            var z = this.User.Claims.FirstOrDefault(x => x.Type == "Id");
            //var r = this.Request;
            var user = await this.userManager.FindByIdAsync(z.Value);
            var x = await this.userManager.IsInRoleAsync(user, "Userr");
            //await this.roleManager.CreateAsync(new ApplicationRole("User"));
            //await this.userManager.AddToRoleAsync(user, "User");
            //await this.userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, "User"));
            //var user1 = await this.userManager.FindByIdAsync(z.Value);

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
