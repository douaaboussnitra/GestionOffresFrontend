export interface JobOffer {
  skills: string;
  id:                  number;
  title:               string;
  description:         string;
  requirements:        string;
  location:            string;
  salary:              string;
  companyName:         string;   // Added companyName field
  postedBy:            number;
  contractType:        string;
  hierarchyLevel:      string;
  email:               string;
}
