import { Card } from "./card"

describe('Card', () => {
  it('should create a card from interface', () => {
    const temp = new Card({
      name: 'name',
      image: 'image'
    })
    expect(temp).toBeInstanceOf(Card)
    expect(temp.name).toEqual('name')
    expect(temp.image).toEqual('image')
  })

  it('should create a card from Card', () => {
    const temp1 = new Card({
      name: 'name1',
      image: 'image1'
    })
    const temp2 = new Card(temp1)
    expect(temp2).toBeInstanceOf(Card)
    expect(temp2.name).toEqual('name1')
    expect(temp2.image).toEqual('image1')
  })

  it('should create a card from Card', () => {
    const temp3 = new Card('name2', 'image2')
    expect(temp3).toBeInstanceOf(Card)
    expect(temp3.name).toEqual('name2')
    expect(temp3.image).toEqual('image2')
  })
})
