import Link from 'next/link';
import { ApiAuthentication } from '@/components/ApiAuthentication';
import { Intro } from '@/components/Intro';
import { EntryPoint } from '@/components/EntryPoint';
import { EndPoints } from '@/components/EndPoints';
import { Status } from '@/components/Status';
import { ListBooks } from '@/components/ListBooks';
import { SingleBook } from '@/components/SingleBook';
import { PlaceOrder } from '@/components/PlaceOrder';
import { AllOrders } from '@/components/AllOrders';
import { SingleOrder } from '@/components/SingleOrder';
import { DeleteOrder } from '@/components/DeleteOrder';
import { UpdateOrder } from '@/components/UpdateOrder';

export default function Home() {
  return (
    <div className='m-3 rounded-lg border-2 border-gray-300 p-5 leading-8'>
      <Intro />
      <EntryPoint />
      <EndPoints />
      <Status />
      <ListBooks />
      <SingleBook />
      <PlaceOrder />
      <AllOrders />
      <SingleOrder />
      <UpdateOrder />
      <DeleteOrder />
      <ApiAuthentication />
    </div>
  );
}
