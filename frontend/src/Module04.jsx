"use client"

// frontend/src/Module04.jsx
import { useState, useRef } from "react"
import CodeEditor from "./components/CodeEditor.jsx"
import AIPopup from "./components/AIPopup.jsx"
import { Link } from "react-router-dom"

function Module04() {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedText, setSelectedText] = useState("")

  const [lessonCode1, setLessonCode1] = useState(`#include <iostream>
#include <string>

// Temel sınıf
class Animal {
protected:
    std::string type;
public:
    Animal() : type("Animal") {}
    virtual ~Animal() {} // Sanal yıkıcı
    
    virtual void makeSound() const {
        std::cout << "Hayvan sesi..." << std::endl;
    }
    
    std::string getType() const {
        return type;
    }
};

// Türetilmiş sınıf
class Dog : public Animal {
public:
    Dog() {
        this->type = "Dog";
    }
    void makeSound() const override {
        std::cout << "Hav hav!" << std::endl;
    }
};

class Cat : public Animal {
public:
    Cat() {
        this->type = "Cat";
    }
    void makeSound() const override {
        std::cout << "Miyav!" << std::endl;
    }
};

int main() {
    std::cout << "--- main fonksiyonu başladı ---" << std::endl;
    const Animal* meta = new Animal();
    const Animal* j = new Dog();
    const Animal* i = new Cat();

    std::cout << "j'nin tipi: " << j->getType() << std::endl;
    std::cout << "i'nin tipi: " << i->getType() << std::endl;

    j->makeSound(); // Dog sesini verir
    i->makeSound(); // Cat sesini verir
    meta->makeSound(); // Animal sesini verir

    delete meta;
    delete j;
    delete i;
    std::cout << "--- main fonksiyonu bitiyor ---" << std::endl;
    return 0;
}`)
  const [lessonOutput1, setLessonOutput1] = useState("")

  const [lessonCode2, setLessonCode2] = useState(`#include <iostream>

class AAnimal {
public:
    // Saf sanal fonksiyon, bu sınıfı soyut yapar.
    virtual void makeSound() const = 0;

    // Sanal yıkıcı
    virtual ~AAnimal() {}
};

class ADog : public AAnimal {
public:
    void makeSound() const override {
        std::cout << "Hav hav!" << std::endl;
    }
};

class ACat : public AAnimal {
public:
    void makeSound() const override {
        std::cout << "Miyav!" << std::endl;
    }
};

int main() {
    // AAnimal a; // Hata! Soyut sınıfın nesnesi oluşturulamaz.
    AAnimal* dog = new ADog();
    AAnimal* cat = new ACat();

    dog->makeSound();
    cat->makeSound();
    
    delete dog;
    delete cat;
    
    return 0;
}`)
  const [lessonOutput2, setLessonOutput2] = useState("")

  const [freeCode, setFreeCode] = useState("")
  const [freeOutput, setFreeOutput] = useState("")

  const contentRef = useRef(null)

  const handleOpenPopup = (text = "") => {
    const fullContent = contentRef.current ? contentRef.current.innerText : ""
    setSelectedText(text)
    setShowPopup(true)
  }

  const handleTextSelection = () => {
    const selection = window.getSelection()
    const selectedText = selection.toString().trim()
    if (selectedText && selection.anchorNode) {
      let currentElement =
        selection.anchorNode.nodeType === Node.TEXT_NODE ? selection.anchorNode.parentElement : selection.anchorNode
      while (currentElement) {
        if (
          currentElement.classList &&
          (currentElement.classList.contains("CodeMirror") || currentElement.classList.contains("editor-section"))
        ) {
          return
        }
        currentElement = currentElement.parentElement
      }
      handleOpenPopup(`Bu kısımda anlamadığım var: "${selectedText}"`)
    }
  }

  return (
    <div className="main-container">
      <div className="content-area">
        <header className="App-header">
          <h1>C++ OOP Öğrenme Platformu</h1>
          <button onClick={() => handleOpenPopup()}>Yardımcıya Sor</button>
          <Link to="/" style={{ marginLeft: "auto", textDecoration: "none", color: "#fff" }}>
            Ana Sayfa
          </Link>
        </header>
        <main>
          <section ref={contentRef} onMouseUp={handleTextSelection}>
            <h2>Modül 04: Çok Biçimlilik ve Soyut Sınıflar</h2>
            <p>
              Bu modül, C++'ın en güçlü OOP prensiplerinden biri olan çok biçimliliği (polymorphism) ve buna zemin
              hazırlayan soyut sınıflar ile sanal fonksiyonları ele alır.
            </p>

            <h3>Ders 1: Çok Biçimlilik (Polymorphism)</h3>
            <p>
              Çok biçimlilik, farklı nesnelerin aynı arayüz üzerinden farklı davranışlar sergileyebilmesidir. C++'ta bu,
              temel sınıf işaretçileri veya referansları kullanarak türetilmiş sınıf nesnelerine erişerek ve `virtual`
              fonksiyonları çağırarak sağlanır.
            </p>
            <p>
              <b>Göreviniz (Polymorphism):</b> `Animal` temel sınıfından kalıtım alan `Dog` ve `Cat` sınıfları
              oluşturacak, her birinin `makeSound` fonksiyonunu kendi seslerini çıkaracak şekilde uygulayacaksınız.
            </p>
            <div className="editor-section">
              <h3>📚 Örnek: Sanal Fonksiyonlar ile Çok Biçimlilik</h3>
              <p>
                Aşağıdaki kodu çalıştırarak, `Animal` tipindeki bir işaretçinin, aslında bir `Dog` veya `Cat` nesnesini
                gösterdiğinde doğru `makeSound` fonksiyonunu nasıl çağırdığını gözlemleyebilirsiniz. Bu, `virtual`
                anahtar kelimesinin sihridir.
              </p>
              <CodeEditor
                code={lessonCode1}
                setCode={setLessonCode1}
                output={lessonOutput1}
                setOutput={setLessonOutput1}
                title="Polymorphism Örneği"
              />
            </div>

            <h3>Ders 2: Soyut Sınıflar (Abstract Classes) ve Arayüzler</h3>
            <p>
              Soyut sınıflar, nesnesi oluşturulamayan, sadece kalıtım yoluyla kullanılmak üzere tasarlanmış sınıflardır.
              Bir sınıfı soyut yapmak için, içinde en az bir tane saf sanal fonksiyon (`= 0;` ile biten) bulunmalıdır.
            </p>
            <p>
              <b>Göreviniz (Abstract class):</b> `Animal` sınıfını, nesnesi oluşturulamayacak şekilde soyut hale
              getireceksiniz.
            </p>
            <div className="editor-section">
              <h3>📚 Örnek: Soyut Sınıfın Kullanımı</h3>
              <p>
                Aşağıdaki kodda, `AAnimal` sınıfı soyut bir sınıftır. Bu sınıfın nesnesi oluşturulamaz, ancak ondan
                türetilen `ADog` ve `ACat` nesneleri oluşturulabilir.
              </p>
              <CodeEditor
                code={lessonCode2}
                setCode={setLessonCode2}
                output={lessonOutput2}
                setOutput={setLessonOutput2}
                title="Soyut Sınıf Örneği"
              />
            </div>

            <div className="editor-section">
              <h3>✏️ Alıştırma Alanı</h3>
              <p>
                Kendi soyut `Shape` sınıfınızı oluşturun. Bu sınıfın `calculateArea()` adında saf sanal bir fonksiyonu
                olsun. Ardından, bu sınıftan kalıtım alan `Circle` ve `Rectangle` sınıflarını oluşturarak
                `calculateArea()` fonksiyonunu her iki sınıf için de uygulayın.
              </p>
              <CodeEditor
                code={freeCode}
                setCode={setFreeCode}
                output={freeOutput}
                setOutput={setFreeOutput}
                title="Serbest Alıştırma"
              />
            </div>
          </section>
        </main>
      </div>
      {showPopup && (
        <AIPopup
          onClose={() => setShowPopup(false)}
          initialQuestion={selectedText}
          fullContent={contentRef.current ? contentRef.current.innerText : ""}
          currentCode={freeCode || lessonCode1}
        />
      )}
    </div>
  )
}

export default Module04
