import Navbar from '@/components/molecules/Navbar';
import Footer from '@/components/molecules/Footer';
import CreateNominatedForm from '@/components/organisms/CreateNominatedForm';
import { getImagesNominateds } from '@/services/firebaseService';

export default async function CreateNominatedPage() {
  const nominatedsImage = await getImagesNominateds();

  return (
    <main>
      <Navbar />
      <CreateNominatedForm nominatedsImage={nominatedsImage} />
      <Footer />
    </main>
  );
}

