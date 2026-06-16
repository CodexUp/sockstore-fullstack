namespace SockStoreAPI.Models
{
    public class DashboardStatsDto
    {
        public int TotalProducts { get; set; }

        public int TotalOrders { get; set; }

        public decimal TotalSales { get; set; }

        public int PendingOrders { get; set; }

        public int CompletedOrders { get; set; }
    }
}