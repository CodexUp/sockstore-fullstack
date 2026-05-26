export interface Order {

    id?: number;
  
    customerName: string;
  
    address: string;
  
    phone: string;
  
    total: number;
  
    createdAt?: Date;

    status?: string;
  
  }