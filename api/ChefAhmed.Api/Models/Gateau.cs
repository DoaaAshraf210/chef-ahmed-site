namespace ChefAhmed.Api.Models
{
    public class Gateau
    {

        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int DisplayOrder { get; set; } = 0;
        public decimal SmallSizePrice { get; set; }  
        public decimal LargeSizePrice { get; set; }  
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
