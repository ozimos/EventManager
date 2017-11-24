import {
  assert
} from 'chai';
import {
  Animal,
  Mammal,
  Birds,
  Dog
} from '../src/app';


describe('Test superclass methods', () => {
  const animal = new Animal('Dinosaur', 4, 5);

  it('test identify method', () => {
    assert.equal(animal.identify(), 'Dinosaur');
  });

  it('test speak method', () => {
    assert.equal(animal.speak(), 'A sound 4 times');
  });

  it('test move method', () => {
    assert.equal(animal.move(), 'A speed of 5 meters per second');
  });
});

describe('Test methods on subclasses ', () => {
  describe('Mammals', () => {
    const animal = new Mammal('Dinosaur', 4, 5);
    it('test identify method', () => {
      assert.equal(animal.identify(), 'Dinosaur');
    });

    it('test speak method', () => {
      assert.equal(animal.speak(), 'Shout 4 times');
    });

    it('test move method', () => {
      assert.equal(animal.move(), 'Walk 5 meters per second');
    });
  });

  describe('Birds', () => {
    const animal = new Birds('Dinosaur', 4, 5);
    it('test identify method', () => {
      assert.equal(animal.identify(), 'Dinosaur');
    });

    it('test speak method', () => {
      assert.equal(animal.speak(), 'Sing 4 times');
    });

    it('test move method', () => {
      assert.equal(animal.move(), 'Fly 5 meters per second');
    });
  });
});

describe('Overide superclass constructor', () => {
  const behaviour = { sound: 'Bark', move: 'Leap' };
  const animal = new Dog('Bingo', 4, 5, behaviour);

  it('test identify method', () => {
    assert.equal(animal.identify(), 'Bingo');
  });

  it('test speak method', () => {
    assert.equal(animal.speak(), 'Bark 4 times');
  });

  it('test move method', () => {
    assert.equal(animal.move(), 'Leap 5 meters per second');
  });
});
