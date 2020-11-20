
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ParaInfoServer.Controllers
{
    public class ItemController : ApiController
    {
        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            var user = this.User;
            return Ok("ItWorks");
        }
    }
}
