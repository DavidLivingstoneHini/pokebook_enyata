import * as React from 'react';
import GenColor from 'colorthief';

import { cn } from '@/utils/utils';
import {
  PokemonsDetails,
  useGetPokemonsDetails,
} from '@/hooks/pokemonList';
import { Button } from '@/components/CustomButton';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/SideModal';
import { Progress } from '@/components/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import { Icons } from '@/components/icons';

function adjustValue(value: number) {
  const adjustedValue = value / 10;

  return adjustedValue.toFixed(1);
}

const pokeEmojis = {
  ghost: '👻',
  poison: '☠️',
  normal: '🐻',
  flying: '🦋',
  grass: '🌿',
  fire: '🔥',
  water: '💧',
  electric: '⚡',
  ground: '🏜',
  rock: '🏞️',
  bug: '🐞',
  psychic: '🧠',
  ice: '❄️',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚙️',
  fairy: '🧚‍♀️',
  fighting: '🥊',
};
function getPokeEmoji(type: string) {
  return pokeEmojis[type as keyof typeof pokeEmojis] || '❔';
}

type CallbackFunction = (color: number[]) => void;
function getDominantColor(imageUrl: string, callback: CallbackFunction): void {
  const img = document.createElement('IMG') as HTMLImageElement;
  const genColor = new GenColor();
  img.setAttribute('src', imageUrl);
  img.crossOrigin = 'Anonymous';
  if (img.complete) {
    callback(genColor.getColor(img));
  } else {
    img.addEventListener('load', function () {
      callback(genColor.getColor(img));
    });
  }
}

export default function PokemonCard({ pokemon }: { pokemon: PokemonsDetails }) {
  const [rgb, setRgb] = React.useState<number[]>([]);

  const pokemonsDetails = useGetPokemonsDetails();
  const pokemonsDetailsData = pokemonsDetails.map(
    (pokemon) => pokemon.data as PokemonsDetails,
  );

  const similarPokemons = pokemonsDetailsData
    .filter((pokemonDetails) => {
      if (pokemonDetails.types.length !== pokemon.types.length) return false;

      return pokemon.types.every(
        (type, index) =>
          type.type.name === pokemonDetails.types[index].type.name,
      );
    })
    .filter((similarPokemon) => similarPokemon.id !== pokemon.id);

  React.useEffect(() => {
    getDominantColor(pokemon.sprites.other.dream_world.front_default, (color) =>
      setRgb(color),
    );
  }, [pokemon.sprites.other.dream_world.front_default]);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <li className="group relative">
          <div className="grid w-full cursor-pointer justify-items-center gap-y-2 rounded-t-[20px] bg-background pt-2.5">
            <div className="size-full px-2.5">
              <div className="flex h-[125.8px] w-full items-center justify-center rounded-[15px] bg-[#F1F1F1] px-2.5 md:h-[148px]">
                <img
                  className="relative -top-12 h-[162.35px] w-[161.09px] object-contain md:h-[191px] md:w-[189.9px]"
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={pokemon.name}
                />
              </div>
            </div>
            <p className="px-2.5 text-2xl font-medium">{pokemon.name}</p>
            <ul className="relative z-20 flex w-full items-center justify-center gap-x-2.5 bg-background px-2.5">
              {pokemon.types.map((type) => (
                <li
                  key={type.type.name}
                  className="flex items-center justify-center gap-x-1 rounded-full bg-[#EEEEEE] px-[12px] py-[4px] font-sans capitalize"
                >
                  <span>{getPokeEmoji(type.type.name)}</span>
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute inset-x-0 z-10 flex h-[40px] w-full -translate-y-3 cursor-pointer items-end rounded-b-[20px] bg-background px-2.5 pb-2.5 shadow-[0_4px_40px_0_hsl(0_0%_0%_/_.06)] transition-[height] duration-300 ease-in-out group-hover:h-[90px]">
            <Button className="relative hidden w-full justify-between px-[20px] py-[12px] group-hover:flex">
              <span>View Pokemon</span>
              <Icons.EyeIcon />
            </Button>
          </div>
        </li>
      </DrawerTrigger>
      <DrawerContent className="inset-y-0 right-0 w-[min(100vw,_659px)] outline-0">
        <div className="max-h-dvh overflow-y-auto p-4">
          <div
            className="relative flex h-44 w-full items-end justify-center rounded-[15px] md:h-[340px]"
            style={{
              backgroundColor: `rgb(${rgb})`,
              backgroundImage: `linear-gradient(to bottom, rgb(${rgb?.map((v) => v + 30)}), rgb(${rgb?.map((v) => v - 30)}))`,
            }}
          >
            <DrawerClose asChild>
              <Button
                variant={'plain'}
                size={'icon'}
                className="absolute left-4 top-4 z-10 size-11 bg-background shadow-[0_4px_4px_0_hsl(0_0%_0%_/_.1)] md:size-[64px]"
              >
                <Icons.ArrowLeftIcon />
              </Button>
            </DrawerClose>
            <img
              className="relative -bottom-16 h-[162.35px] w-[161.09px] object-contain md:h-[319px] md:w-[312px]"
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />
          </div>
          <div className="mt-20 grid justify-items-center gap-y-3 pb-10">
            <p className="text-4xl font-semibold capitalize md:text-5xl">
              {pokemon.name}
            </p>
            <ul className="flex items-center justify-center gap-x-2.5">
              {pokemon.types.map((type) => (
                <li
                  key={type.type.name}
                  className="flex items-center justify-center gap-x-1 rounded-full bg-[#EEEEEE] px-[12px] py-[4px] font-sans capitalize"
                >
                  <span>{getPokeEmoji(type.type.name)}</span>
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>
          <Tabs defaultValue="about" className="flex w-full flex-col">
            <TabsContent value="about" className="grid">
              <Divider />

              <p className="py-3 text-center text-2xl font-semibold">About</p>
              <Divider />
              <div
                className="mx-auto w-[min(100%,_510px)]"
                style={{
                  backgroundImage:
                    'linear-gradient(270deg, #FFFFFF 0%, hsla(0, 0%, 85%, 0.35) 51.04%, #FFFFFF 100%)',
                }}
              >
                <div className="grid grid-cols-2 gap-x-6 py-2 text-lg md:gap-x-10 md:text-xl">
                  <p className="justify-self-end">Height</p>
                  <p className="font-semibold">
                    {adjustValue(pokemon.height)}m
                  </p>
                </div>
                <Divider className="w-1/2" />
                <div className="grid grid-cols-2 gap-x-6 py-2 text-lg md:gap-x-10 md:text-xl">
                  <p className="justify-self-end">Weight</p>
                  <p className="font-semibold">
                    {adjustValue(pokemon.weight)}kg
                  </p>
                </div>
                <Divider className="w-1/2" />
                <div className="grid grid-cols-2 gap-x-6 py-2 text-lg md:gap-x-10 md:text-xl">
                  <p className="justify-self-end">Abilities</p>
                  <ul className="list-inside list-disc font-semibold">
                    {pokemon.abilities.map((ability, index) => (
                      <li key={ability.ability.name} className="truncate">
                        {ability.ability.name.split('-').join(' ')}
                        {index === pokemon.abilities.length - 1 ? '' : ','}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Divider />
            </TabsContent>
            <TabsContent value="stats" className="grid">
              <Divider />

              <p className="py-3 text-center text-2xl font-semibold">Stats</p>
              <Divider />
              <div
                className="mx-auto w-[min(100%,_510px)]"
                style={{
                  backgroundImage:
                    'linear-gradient(270deg, #FFFFFF 0%, hsla(0, 0%, 85%, 0.35) 51.04%, #FFFFFF 100%)',
                }}
              >
                {pokemon.stats.map((stat, index) => (
                  <React.Fragment key={stat.stat.name}>
                    <div className="grid grid-cols-[1fr_120px_36px] items-center gap-x-6 py-2 text-lg md:grid-cols-[1fr_189px_36px] md:gap-x-10 md:text-xl">
                      <p
                        className={cn(
                          'justify-self-end capitalize',
                          stat.stat.name === 'hp' && 'uppercase',
                        )}
                      >
                        {stat.stat.name.split('-').join(' ')}
                      </p>
                      <Progress value={stat.base_stat} />
                      <p className="font-semibold">{stat.base_stat}</p>
                    </div>
                    {index !== pokemon.stats.length - 1 ? (
                      <Divider className="w-2/3" />
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
              <Divider />
            </TabsContent>
            <TabsContent value="similar" className="grid">

              <Divider />
              <p className="py-3 text-center text-2xl font-semibold">Similar</p>
              <Divider />
              <div className="mx-auto mt-20 grid w-[min(100%,_510px)] pb-4">
                <ul className="grid grid-cols-[repeat(auto-fill,_minmax(min(288px,_100%),_1fr))] gap-x-4 gap-y-20 md:grid-cols-2">
                  {similarPokemons.map((similarPokemon) => (
                    <li
                      key={similarPokemon.id}
                      className="grid justify-items-center gap-y-2 rounded-[20px] bg-background p-2.5 shadow-[0_4px_40px_0_hsl(0_0%_0%_/_.06)]"
                    >
                      <div className="flex h-[125.8px] w-full items-center justify-center rounded-[15px] bg-[#F1F1F1] md:h-[148px]">
                        <img
                          className="relative -top-12 h-[162.35px] w-[161.09px] object-contain md:h-[191px] md:w-[189.9px]"
                          src={
                            similarPokemon.sprites.other.dream_world
                              .front_default
                          }
                          alt={similarPokemon.name}
                        />
                      </div>
        
                      <p className="text-2xl font-medium">
                        {similarPokemon.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <Divider />
            </TabsContent>
            <TabsList className="mt-16 self-center md:mt-28">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="similar">Similar</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Divider({ className }: { className?: string }) {
  return (
    <div
      className={cn('mx-auto h-0.5 w-[min(90%,_510px)]', className)}
      style={{
        backgroundImage:
          'linear-gradient(270deg, #FFFFFF -20%, hsla(0, 0%, 85%, 0.45) 45.3%, #FFFFFF 102.92%)',
      }}
    />
  );
}
