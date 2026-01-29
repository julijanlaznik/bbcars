
export type Language = 'CZ' | 'EN';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  author: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  bodyType: 'SUV' | 'Coupe' | 'Sedan' | 'Convertible';
  inServiceFrom: string;
  price: string;
  km: string;
  image: string; // cover image
  images: string[]; // main gallery images
  interiorImages: string[]; // category specific: interior
  exteriorImages: string[]; // category specific: exterior
  engineCapacity: string;
  powerKw: string;
  drivetrain: string;
  story: {
    CZ: string;
    EN: string;
  };
  detailedDescription?: {
    CZ: string[];
    EN: string[];
  };
  emotionalHeadline: {
    CZ: string;
    EN: string;
  };
  specs: {
    engine: string;
    power: string;
    transmission: string;
    fuel: string;
  };
  equipment: string[];
}

export interface Translation {
  nav_home: string;
  nav_inventory: string;
  nav_about: string;
  nav_custom_order: string;
  nav_buyout: string;
  nav_services: string;
  nav_rent: string;
  nav_contact: string;
  nav_philosophy: string;
  nav_showroom: string;
  hero_headline: string;
  hero_cta: string;
  philosophy_title: string;
  philosophy_text: string;
  curated_selection_title: string;
  custom_order_card_title: string;
  custom_order_card_cta: string;
  showroom_title: string;
  showroom_text: string;
  showroom_cta: string;
  footer_location: string;
  footer_contact: string;
  footer_newsletter_title: string;
  footer_newsletter_placeholder: string;
  footer_newsletter_button: string;
  footer_nav_services: string;
  footer_nav_legal: string;
  footer_terms: string;
  footer_privacy: string;
  car_back: string;
  car_inquiry: string;
  car_specs_title: string;
  label_in_service: string;
  label_odometer: string;
  label_engine: string;
  label_power: string;
  label_fuel: string;
  label_drivetrain: string;
  label_vat_deductible: string;
}
