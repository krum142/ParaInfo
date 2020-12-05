using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using Parainfo.Data.Models;
using Services.Services.Data.Interfaces;

namespace ParaInfoServer.Controllers
{
    public class ParagliderController : ApiController
    {
        private readonly IParagliderService paragliderService;

        public ParagliderController(IParagliderService paragliderService)
        {
            this.paragliderService = paragliderService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await paragliderService.GetAllAsync());
        }

        [HttpGet("{brand}/{model}")]
        public async Task<IActionResult> Get(string brand, string model)
        {
            var paraglider = await paragliderService.GetByModelAndBrandAsync(brand, model);
            if (paraglider != null)
            {
                return this.Json(paraglider);
            }

            return Json(new { });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm]AddParagliderModel input)
        {
            return Json(await paragliderService.CreateAsync(input));
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put(Paraglider input)
        {
            return Json(await paragliderService.UpdateAsync(input));
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> Delete(Paraglider input)
        {
            return Json(await paragliderService.DeleteAsync(input.Id));
        }
    }
}
