namespace SockStoreAPI.Models
{
    public class Order
    {
        public int Id { get; set; }

        public string CustomerName { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public decimal Total { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public string Status { get; set; } = "Pending";   

        public List<OrderItem> Items { get; set; } = new();

        public int UserId { get; set; }

        public User? User { get; set; }
    }
}