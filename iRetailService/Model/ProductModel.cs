using Google.Cloud.Firestore;
using System;

namespace iRetailService.Model
{
    [FirestoreData]
    public class ProductModel
    {
        [FirestoreProperty]
        public Int64 ProductID { get; set; }
        [FirestoreProperty]
        public string ProductName { get; set; }
        [FirestoreProperty]
        public Int64 TotalCount { get; set; }
        [FirestoreProperty]
        public Int64 AvailableCount { get; set; }
        [FirestoreProperty]
        public Int64 SalesCount { get; set; }
        [FirestoreProperty]
        public Int64 Price { get; set; }
        [FirestoreProperty]
        public Int64 OriginalPrice { get; set; }
        [FirestoreProperty]
        public Int64 TotalSalePrice { get; set; }
    }
}
