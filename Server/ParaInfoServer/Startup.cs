using AspNetCore.Identity.Mongo;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Parainfo.Data.Models.Identity;
using System.Text;
using Parainfo.Data.Common.Repositories;
using Parainfo.Data.Configs;
using Services.Services.Data;
using Services.Services.Data.Interfaces;


namespace ParaInfoServer
{
    public class Startup
    {
        private string connectionString => this.Configuration.GetSection("DatabaseConfiguration")["ConnectionString"];

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var databaseConfiguration = this.Configuration.GetSection("DatabaseConfiguration");
            services.Configure<DatabaseConfiguration>(databaseConfiguration);


            services.AddSingleton(typeof(DatabaseConfiguration));
            services.AddScoped(typeof(IMongoRepository<>),typeof(MongoRepository<>));
            services.AddTransient<IBrandService,BrandService>();


            services.AddIdentityMongoDbProvider<ApplicationUser>(identity =>
                {
                    identity.Password.RequireDigit = false;
                    identity.Password.RequireLowercase = false;
                    identity.Password.RequireNonAlphanumeric = false;
                    identity.Password.RequireUppercase = false;
                    identity.Password.RequiredLength = 1;
                    identity.Password.RequiredUniqueChars = 0;
                },
                mongo =>
                {
                    mongo.ConnectionString = connectionString;
                }
            );

            var applicationSettings = this.Configuration.GetSection("ApplicationSettings");
            services.Configure<AppSettings>(applicationSettings);

            var appSettings = applicationSettings.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            services
                .AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = false;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ParaInfo", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseDeveloperExceptionPage();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ParaInfo"));
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(opt => opt
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
