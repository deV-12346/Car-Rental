import { connectDb } from '@/libs/connectDb';
import CarCard from './CarCard';
import { CarModel } from '@/model/car.model';

export const revalidate = 30;
export interface Cars {
    _id:string,
    brand:string;
    carNumber:string,
    carModel:number;
    type:string;
    seats:number;
    fuelType:"Diesel" | "Petrol";
    transmission:"Automatic"| "Manual";
    pricePerDay:number;
    images:Array<{url:string}>;
    available:boolean;
}
const BestCars = async() => {
     await connectDb();
     const bestCars = await CarModel.find().limit(5).lean();
  return (
    <div className="mt-4">
    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Best Car for Today
      </h2>
        <div className='w-full my-4 grid grid-cols-1 md:grid-cols-5 gap-6 place-items-center'>
          { bestCars.map((car)=>(
            <div key={car._id.toString()}>
              <CarCard car={car} />
            </div>
          ))
        }
          </div>
    </div>
  )
}

export default BestCars