using Microsoft.IdentityModel.Tokens;
using Notebook_app.Interfaces;
using Notebook_app.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Notebook_app.Service
{
    public class JwtService:IJwtService
    {
        private readonly IConfiguration _config;
       

        public JwtService(IConfiguration configuration)
        {
            _config = configuration;
        }
        public string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
       {
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.NameIdentifier,user.UserId.ToString()),
        };

            var token = new JwtSecurityToken(
             issuer: _config["Jwt:Issuer"],
             audience: _config["Jwt:Audience"],
             claims: claims,
             expires: DateTime.Now.AddMinutes(60),
             signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);


        }
    }
}
