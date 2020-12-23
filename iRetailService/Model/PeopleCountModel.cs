using System.Collections.Generic;

namespace iRetailService.Model
{
    public class PeopleCountModel
    {
        public int NoOfPeople { get; set; }
        public List<PeopleModel> Appearing { get; set; }
    }

    public class PeopleModel
    {
        public string PeopleID { get; set; }
        public string DurationAppeared { get; set; }
    }
}
