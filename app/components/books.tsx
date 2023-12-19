import React, {useState} from 'react'
import { Card, CardSection, Text, Group, Badge, Pagination, Skeleton } from '@mantine/core'


interface BooksInterface {
    items: any[],
    kind: string,
    totalItems: number,
    maxResults: number
  }

const BookCardSkeleteon: React.FC<{isLoading: boolean;}> = ({isLoading}) => {
    return (
        <Card shadow="xl" padding="lg" radius="md" withBorder style={{width: '18.555555%'}}>
          <CardSection>
            <div className='w-20 h-60'>
              <Skeleton height={220} width={280} radius="md" />
            </div>
          </CardSection>
          <Group className='mt-4 flex justify-between'>
            <Skeleton height={16} width="60%" />
            <Skeleton height={16} width={40} />
          </Group>
          <Group mt="sm" className='flex justify-between w-full h-full object-center'>
            <Text c="dimmed" size="sm">Authors: </Text>
            <Skeleton height={16} width="60%" />
          </Group>
          <CardSection mx={2} my={2} className='h-15 mt-2'>
            <Skeleton height={12} width="80%" />
            <Skeleton height={12} width="80%" />
            <Skeleton height={12} width="80%" />
          </CardSection>
        </Card>
    )
}

const Books: React.FC<{targetRef: React.RefObject<HTMLDivElement>;booksObj : BooksInterface; pageState: any[]; isLoading: boolean;}> = ({targetRef, booksObj, pageState, isLoading}) => {
    const {items, kind, totalItems, maxResults} = booksObj
    const [activePage, setPage] = pageState

    return <div ref={targetRef}> {
        isLoading ? <><div className='flex flex-wrap gap-6 mx-4'>
            {
                Array.from({length: maxResults}).map((_, index) => {
                    return <BookCardSkeleteon isLoading={isLoading} />
                })
            }
        </div></> : 
        <>
            <div className='grid grid-cols-5 gap-6 mx-4'>
                {  
                    items.map((book : any) => {
                        return (
                            <Card shadow="xl" padding="lg" radius="md" withBorder>
                                <CardSection>
                                    <div className='w-30 h-80'>
                                        <img
                                            src={book.volumeInfo?.imageLinks?.thumbnail ?? '/images/default.jpg'}
                                            alt="No-way"
                                            className='rounded-lg object-center w-full h-full'
                                        />
                                    </div>
                                </CardSection>
                            <Group className='mt-4 flex justify-between'>
                                <span className='w-3/5 text-sm font-bold truncate'>{book.volumeInfo?.title}</span>
                                <Badge color="blue">{book.volumeInfo?.language}</Badge>
                            </Group>
                            <Group mt="sm" className='flex justify-between w-full h-full object-center'>
                                <Text c="dimmed" size="sm">Authors: </Text>
                                <Text c="dimmed" size="sm" className='w-3/5 truncate'> {...(book.volumeInfo?.authors ?? ['unknown'])} </Text>
                            </Group>
                            <CardSection mx={1} my={1} className='h-15'>
                                <Text size='sm'>{book.volumeInfo?.subtitle}</Text>
                            </CardSection>
                            </Card>
                        )
                    })
                }
            </div>
            <Pagination total={Math.floor((totalItems)/maxResults) > 20 ? 20 : Math.floor((totalItems)/maxResults)} value={activePage} onChange={setPage} siblings={2} className='m-4 flex justify-end'/>
            <br/>
        </>
    }</div>
}

export default Books