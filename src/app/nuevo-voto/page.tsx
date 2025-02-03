import Navbar from '@/components/molecules/Navbar';
import Footer from '@/components/molecules/Footer';
import NewVoteForm from '@/components/organisms/NewVoteForm';

export default function NewVotePage() {
  return (
    <main>
      <Navbar />
      <NewVoteForm />
      <Footer />
    </main>
  );
}

