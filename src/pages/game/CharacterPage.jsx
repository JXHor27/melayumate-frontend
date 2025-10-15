import BattleScene from "../../components/game/BattleScene";
function CharacterPage() {
     return (
    <div className='flex'>
     <div className="ml-64 flex-1 w-220 bg-zinc-800 min-h-screen py-8">
            {/* Character Banner */}
            <div className="flex items-center bg-zinc-700 text-white rounded-md p-4 mb-8 shadow">
                <p className="ml-4 text-lg">My Characters</p>
                <p className='ml-auto'>MelayuMate <span className='text-zinc-400'>{'>'} Character</span></p>
            </div> 
            <BattleScene/>
        </div>
    </div>
  );
}

export default CharacterPage;