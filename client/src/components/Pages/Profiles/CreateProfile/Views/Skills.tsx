
/*
Artist -> Career -> Skills

          Visual arts
            Photography
            Painting
            Drawing
            Sculpturing

          Performing arts
            Dancer
              Ballet
              Modern
            Actor
              Movie
              Theatre
          
          Music
            Musician
              String
              Woodwinds
              Brass
              Percussion
              Voice
              Keyboard
              Pluck
              Electric
            Composer
*/

import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_CATEGORIES } from "../../../../../graphql/queries"

const treeData = {
  name: '',
  parent: '',
  children: [
    {
      name: 'Visual arts',
      parent: '',
      children: [
        {
          name: 'Photography',
          parent: 'Visual arts',
          children: []
        },
        {
          name: 'Painting',
          parent: 'Visual arts',
          children: []
        },
        {
          name: 'Drawing',
          parent: 'Visual arts',
          children: []
        },
      ]
    },
    {
      name: 'Performing arts',
      parent: '',
      children: [
        {
          name: 'Dancer',
          parent: 'Performing arts',
          children: [
            {
              name: 'Ballet',
              parent: 'Dancer',
              children: []
            },
            {
              name: 'Modern',
              parent: 'Dancer',
              children: []
            }
          ],
        },
        {
          name: 'Actor',
          parent: 'Performing arts',
          children: [
            {
              name: 'Theatre',
              parent: 'Actor',
              children: []
            },
            {
              name: 'Movie',
              parent: 'Actor',
              children: []
            }
          ],
        }
      ]
    }
  ]
}

interface Category {
  id: string,
  name: String,
  path: String
}

const Skills = () => {
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [currentPath, setCurrentPath] = useState<String[]>([''])
  const [currentPathToString, setCurrentPathToString] = useState<String>('')
  const { loading, data } = useQuery(ALL_CATEGORIES, { onCompleted: () => setAllCategories(data.allCategories) })

  if (loading) return <div>Loading...</div>

  const setPathValues = (newPath) => {
    const newPathString = newPath.reduce((prevVal, curVal) => `${prevVal}${curVal}`, ``)
    setCurrentPathToString(newPathString)
    setCurrentPath(newPath)
  }

  const handlePathChangeToNext = (clickedName) => {
    const newPath = currentPath.concat(`/${clickedName}`)
    setPathValues(newPath)
  }

  const handlePathChangeToPrevious = () => {
    const newPath = currentPath.splice(0, currentPath.length - 1)
    setPathValues(newPath)
  }

  return (
    <div>
      <h3>Skills mon</h3>
      {allCategories.map(obj => {
        return (
          obj.path === currentPathToString && <div key={obj.id} onClick={() => handlePathChangeToNext(obj.name)}>{obj.name} ••• {obj.path}</div>
        )
      })}
      <button onClick={() => handlePathChangeToPrevious()}>{currentPath[currentPath.length - 1]}</button>
    </div>
  )
}

export default Skills