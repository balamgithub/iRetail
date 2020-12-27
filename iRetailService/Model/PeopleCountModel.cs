using Google.Cloud.Firestore;
using System;

namespace iRetailService.Model
{
    [FirestoreData]
    public class PeopleCountModel
    {
        [FirestoreProperty]
        public Int64 PeopleCount { get; set; }
        [FirestoreProperty]
        public string ProductName { get; set; }
    }

    public class PeopleModel
    {
        public string PeopleID { get; set; }
        public string DurationAppeared { get; set; }
    }
}
