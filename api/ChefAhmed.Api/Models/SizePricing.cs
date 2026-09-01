namespace ChefAhmed.Api.Models
{
    public class SizePricing
    {
        public int Id { get; set; }
        public string SizeLabel { get; set; } = string.Empty;  
        public string Price { get; set; } = string.Empty;
        public int DisplayOrder { get; set; } = 0;
    }
}
