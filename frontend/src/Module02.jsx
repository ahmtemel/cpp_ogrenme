"use client"

// frontend/src/Module02.jsx
import { useState, useRef, useEffect } from "react"
import CodeEditor from "./components/CodeEditor.jsx"
import AIPopup from "./components/AIPopup.jsx"
import { Link } from "react-router-dom"

function Module02({ setIsPopupVisibleInApp }) {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedText, setSelectedText] = useState("")

  useEffect(() => {
    setIsPopupVisibleInApp(showPopup)
  }, [showPopup, setIsPopupVisibleInApp])

  const [lessonCode1, setLessonCode1] = useState(`#include <iostream>

class Fixed {
    // Sınıfın Ortodoks Kanonik formdaki üyeleri
public:
    // 1. Varsayılan Kurucu (Default Constructor)
    Fixed() {
        std::cout << "Varsayılan kurucu çağrıldı." << std::endl;
    }
    // 2. Kopyalama Kurucusu (Copy Constructor)
    Fixed(const Fixed& other) {
        std::cout << "Kopyalama kurucusu çağrıldı." << std::endl;
    }
    // 3. Kopyalama Atama Operatörü (Copy Assignment Operator)
    Fixed& operator=(const Fixed& other) {
        std::cout << "Kopyalama atama operatörü çağrıldı." << std::endl;
        if (this != &other) {
            // Kopyalama mantığı buraya gelir.
        }
        return *this;
    }
    // 4. Yıkıcı (Destructor)
    ~Fixed() {
        std::cout << "Yıkıcı çağrıldı." << std::endl;
    }
};

int main() {
    std::cout << "--- main fonksiyonu başladı ---" << std::endl;
    Fixed a;      // a nesnesi oluşturulur.
    Fixed b(a);   // a nesnesini kopyalayarak b oluşturulur.
    Fixed c;      // c nesnesi oluşturulur.
    c = b;        // b nesnesi c'ye atanır.
    std::cout << "--- main fonksiyonu bitiyor ---" << std::endl;
    return 0;
}
`)
  const [lessonOutput1, setLessonOutput1] = useState("")

  const [lessonCode2, setLessonCode2] = useState(`#include <iostream>

class Point {
public:
    int x, y;
    Point(int x = 0, int y = 0) : x(x), y(y) {}

    Point operator+(const Point& other) {
        return Point(x + other.x, y + other.y);
    }
    
    void display() const {
      std::cout << "Koordinatlar: (" << x << ", " << y << ")" << std::endl;
    }
};

int main() {
    Point p1(10, 20);
    Point p2(3, 5);
    Point p3 = p1 + p2;
    p3.display();
    
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
    <>
      <header className="App-header">
        <h1>C++ OOP Öğrenme Platformu</h1>
        <button onClick={() => handleOpenPopup()}>Yardımcıya Sor</button>
        <Link to="/" style={{ marginLeft: "auto", textDecoration: "none", color: "#fff" }}>
          Ana Sayfa
        </Link>
      </header>
      <main>
        <section ref={contentRef} onMouseUp={handleTextSelection}>
          <h2>Modül 02: Operatör Yükleme ve Kanonik Form</h2>
          <p>
            Bu modül, C++'ta sınıf tasarımını ve operatörlerin gücünü kullanarak daha anlamlı ve kullanışlı sınıflar
            oluşturmayı hedefler. Özellikle, her sınıfın takip etmesi gereken <b>"Ortodoks Kanonik Sınıf Formu"</b> ile
            tanışacaksınız.
          </p>

          <h3>Ders 1: Ortodoks Kanonik Sınıf Formu</h3>
          <p>Modül 02'den itibaren, tüm sınıflarınızın dört temel üye fonksiyonu içermesi beklenir:</p>
          <ul>
            <li>
              <b>Varsayılan Kurucu (Default Constructor):</b> Nesne, hiçbir parametre almadan oluşturulduğunda çağrılır.{" "}
              <code>Fixed a;</code>
            </li>
            <li>
              <b>Kopyalama Kurucusu (Copy Constructor):</b> Mevcut bir nesnenin kopyası oluşturulduğunda çağrılır.{" "}
              <code>Fixed b(a);</code>
            </li>
            <li>
              <b>Kopyalama Atama Operatörü (Copy Assignment Operator):</b> Bir nesnenin değeri, başka bir nesneye
              atandığında çağrılır. <code>c = b;</code>
            </li>
            <li>
              <b>Yıkıcı (Destructor):</b> Nesne, bellekten silinirken çağrılır. Kaynakları serbest bırakmak için
              kullanılır.
            </li>
          </ul>
          <p>Bu dördü, bir C++ sınıfının nesne ömrünü doğru bir şekilde yönetebilmesi için hayati öneme sahiptir.</p>

          <div className="editor-section">
            <h3>📚 Örnek: `Fixed` Sınıfı ve Kanonik Formun Yaşam Döngüsü</h3>
            <p>
              Aşağıdaki kod parçasını çalıştırarak bir sınıfın nesne yaşam döngüsünü gözlemleyebilirsiniz. Çıktıyı
              dikkatlice inceleyin ve her bir `cout` mesajının neden o sırayla geldiğini anlamaya çalışın.
            </p>
            <CodeEditor
              code={lessonCode1}
              setCode={setLessonCode1}
              output={lessonOutput1}
              setOutput={setLessonOutput1}
              title="Fixed Sınıfı Örneği"
            />
            <h4>Örnek Çıktının Adım Adım Açıklaması</h4>
            <ol>
              <li>
                <b>`Fixed a;`</b> satırı, <code>a</code> adında bir nesne oluşturur. Hiç parametre verilmediği için{" "}
                <b>varsayılan kurucu</b> çağrılır.
              </li>
              <li>
                <b>`Fixed b(a);`</b> satırı, mevcut <code>a</code> nesnesini kullanarak <code>b</code> nesnesini
                oluşturur. Bu işlem, <b>kopyalama kurucusunu</b> tetikler.
              </li>
              <li>
                <b>`Fixed c;`</b> satırı, <code>c</code> adında bir nesne oluşturur. Yine parametresiz olduğu için{" "}
                <b>varsayılan kurucu</b> çağrılır.
              </li>
              <li>
                <b>`c = b;`</b> satırı, <code>b</code> nesnesinin değerini <code>c</code> nesnesine atar. Burada bir
                atama işlemi olduğu için <b>kopyalama atama operatörü</b> çağrılır.
              </li>
              <li>
                <b>
                  <code>return 0;</code>
                </b>{" "}
                ile main fonksiyonu biter. Fonksiyon bittiği için içinde oluşturulan nesneler (<code>a</code>,{" "}
                <code>b</code>, <code>c</code>) bellekten silinmeye başlar ve sırasıyla <b>yıkıcıları</b> çağrılır.
              </li>
            </ol>
          </div>

          <h3>Ders 2: Operatör Yükleme</h3>
          <p>
            Operatör yükleme (operator overloading), var olan operatörlerin (`+`, `-`, `&gt;`, `==` gibi) kendi
            sınıflarınızla çalışacak şekilde yeniden tanımlanmasıdır. Bu, sınıflarınızı daha sezgisel ve okunabilir hale
            getirir. Örneğin, iki `Point` nesnesini toplamak için `p1 + p2` yazmak, `p1.topla(p2)` yazmaktan daha doğal
            bir yoldur.
          </p>
          <p>
            <b>Aşağıdaki örnekte,</b> iki `Point` nesnesini toplamak için `+` operatörünü nasıl yükleyeceğiniz
            gösterilmiştir. `operator+` adında bir üye fonksiyon tanımlayarak, `p1 + p2` ifadesinin ne anlama geleceğini
            C++'a söylemiş oluruz.
          </p>
          <div className="editor-section">
            <h3>📚 Örnek: `+` Operatörünü Yükleme</h3>
            <p>
              Bu kodu çalıştırdığınızda, `operator+` fonksiyonunun nasıl çalıştığını ve iki nesneyi toplayarak yeni bir
              nesne oluşturduğunu göreceksiniz.
            </p>
            <CodeEditor
              code={lessonCode2}
              setCode={setLessonCode2}
              output={lessonOutput2}
              setOutput={setLessonOutput2}
              title="Operatör Yükleme Örneği"
            />
          </div>

          <div className="editor-section">
            <h3>✏️ Alıştırma Alanı</h3>
            <p>
              Kendi `Point` sınıfınızı oluşturup `-` operatörünü yükleyerek iki noktayı birbirinden çıkarın. Sonucu
              ekrana yazdırın.
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
      {showPopup && (
        <AIPopup
          onClose={() => setShowPopup(false)}
          initialQuestion={selectedText}
          fullContent={contentRef.current ? contentRef.current.innerText : ""}
          currentCode={freeCode}
        />
      )}
    </>
  )
}

export default Module02
