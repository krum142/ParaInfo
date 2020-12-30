using AspNetCore.Identity.Mongo.Model;

namespace Parainfo.Data.Models.Identity
{
    public class ApplicationRole : MongoRole
    {
        public ApplicationRole(string role)
            :base(role)
        {
        }
    }
}
