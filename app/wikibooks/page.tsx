import React from 'react'
import { Card, CardSection, Text, Group, Badge } from '@mantine/core'
import { promises as fs } from 'fs';

interface book {
    author: string,
    country: string,
    imageLink: string,
    language: string,
    link: string,
    pages: number,
    title: string,
    year: number
}

const books = async () => {
    const file = await fs.readFile(process.cwd() + '/app/books.json', 'utf8');
    const data = JSON.parse(file);
    // console.log(data)

  return (
    <div className='mx-2 grid grid-cols-3 gap-8'>
        {
            data.map((book : book) => {
                return <>                
                    <Card shadow="xl" padding="lg" radius="md" withBorder>
                        <CardSection>
                        <div className='w-30 h-80'>
                            <img
                                src={`/${book.imageLink}`}
                                alt="No way!"
                                className='rounded-lg object-center w-full h-full'
                            />
                        </div>
                        </CardSection>
                        <Group className='mt-4 flex justify-between'>
                            <span className='w-3/5 text-sm truncate'>{book.title}</span>
                            <Badge color="blue">{book.language}</Badge>
                        </Group>
                        <Text></Text>
                    </Card>
                </>
            })
        }
    </div>
  )
}

export default books