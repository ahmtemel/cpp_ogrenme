"use client"

// frontend/src/Module03.jsx
import { useState, useRef, useEffect } from "react"
import CodeEditor from "./components/ClientCodeEditor.jsx"
import AIPopup from "./components/AIPopup.jsx"
import { Link } from "react-router-dom"

function Module03({ setIsPopupVisibleInApp }) {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedText, setSelectedText] = useState("")

  useEffect(() => {
    setIsPopupVisibleInApp(showPopup)
  }, [showPopup, setIsPopupVisibleInApp])

  const [lessonCode1, setLessonCode1] = useState(`#include <iostream>
#include <string>

// Temel sınıf: ClapTrap
class ClapTrap {
protected:
    std::string _name;
    int _hitPoints;
    int _energyPoints;
    int _attackDamage;

public:
    ClapTrap(std::string name) : _name(name), _hitPoints(10), _energyPoints(10), _attackDamage(0) {
        std::cout << "ClapTrap " << _name << " hazır! Varsayılan can: " << _hitPoints << std::endl;
    }
    ~ClapTrap() {
        std::cout << "ClapTrap " << _name << " yok oldu!" << std::endl;
    }

    void attack(const std::string& target) {
        if (_energyPoints > 0) {
            std::cout << "ClapTrap " << _name << " hedefine (" << target << ") "
                      << _attackDamage << " puan hasar verdi!" << std::endl;
            _energyPoints--;
        } else {
            std::cout << "ClapTrap " << _name << " saldırmak için yeterli enerjiye sahip değil!" << std::endl;
        }
    }
    void takeDamage(unsigned int amount) {
        std::cout << "ClapTrap " << _name << " " << amount << " hasar aldı." << std::endl;
        _hitPoints -= amount;
        if (_hitPoints < 0) {
            _hitPoints = 0;
        }
        std::cout << "Kalan can: " << _hitPoints << std::endl;
    }
    void beRepaired(unsigned int amount) {
        if (_energyPoints > 0) {
            std::cout << "ClapTrap " << _name << " " << amount << " kadar iyileşiyor." << std::endl;
            _hitPoints += amount;
            _energyPoints--;
        } else {
            std::cout << "ClapTrap " << _name << " tamir olmak için yeterli enerjiye sahip değil!" << std::endl;
        }
    }
};

// Türetilmiş sınıf: ScavTrap
class ScavTrap : public ClapTrap {
public:
    // ScavTrap için özel kurucu
    ScavTrap(std::string name) : ClapTrap(name) {
        this->_hitPoints = 100;
        this->_energyPoints = 50;
        this->_attackDamage = 20;
        std::cout << "ScavTrap " << _name << " savaşa hazır! Ozel can: " << _hitPoints << std::endl;
    }
    // ScavTrap için özel yıkıcı
    ~ScavTrap() {
        std::cout << "ScavTrap " << _name << " gitti!" << std::endl;
    }
    // ScavTrap'a özel yetenek
    void guardGate() {
        std::cout << "ScavTrap " << _name << " şimdi Kapı Koruyucu modunda." << std::endl;
    }
};

int main() {
    std::cout << "--- main fonksiyonu başladı ---" << std::endl;
    ScavTrap scavTrap("Serena");
    scavTrap.attack("Düşman 1");
    scavTrap.takeDamage(10);
    scavTrap.beRepaired(5);
    scavTrap.guardGate();
    std::cout << "--- main fonksiyonu bitiyor ---" << std::endl;
    return 0;
}`)
  const [lessonOutput1, setLessonOutput1] = useState("")

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
          <h2>Modül 03: Kalıtım (Inheritance)</h2>
          <p>
            Kalıtım, bir sınıfın (türetilmiş sınıf) başka bir sınıftan (temel sınıf) özelliklerini ve davranışlarını
            miras almasını sağlayan temel bir OOP prensibidir. Bu sayede kod tekrarını önler ve daha düzenli bir sınıf
            hiyerarşisi oluşturabilirsiniz.
          </p>
          <p>
            <b>Göreviniz (Aaaaand... OPEN!):</b> İlk olarak, bir robot temel sınıfı olan <b>ClapTrap</b>'ı
            uygulayacaksınız. Ardından, <b>ScavTrap</b> ve <b>FragTrap</b> sınıflarını bu temel sınıftan türeteceksiniz.
          </p>

          <h3>Ders 1: Temel Sınıf ve Türetilmiş Sınıf</h3>
          <p>
            Temel sınıf, ortak özellikleri ve davranışları tanımladığınız ana sınıftır. Türetilmiş sınıflar ise bu temel
            sınıftan kalıtım alarak, ortak özelliklere ek olarak kendi benzersiz özelliklerini ekler.
          </p>
          <p>
            Aşağıdaki örnekte, bir <b>ClapTrap</b> temel sınıfı ve ondan kalıtım alan <b>ScavTrap</b> türetilmiş sınıfı
            oluşturulmuştur. `ScavTrap`, temel sınıftaki `attack`, `takeDamage` ve `beRepaired` gibi fonksiyonlara
            erişebilir ve kendi özel fonksiyonu olan `guardGate`'i ekleyebilir.
          </p>
          <div className="editor-section">
            <h3>📚 Örnek: `ClapTrap` ve `ScavTrap` Kalıtımı</h3>
            <p>
              Aşağıdaki kodu inceleyerek kalıtımın nasıl çalıştığını gözlemleyebilirsiniz. `ScavTrap` nesnesi
              oluşturulduğunda önce temel sınıf (`ClapTrap`), sonra türetilmiş sınıfın kurucusunun çağrıldığına dikkat
              edin. Yıkım ise ters sırada gerçekleşir.
            </p>
            <CodeEditor
              code={lessonCode1}
              setCode={setLessonCode1}
              output={lessonOutput1}
              setOutput={setLessonOutput1}
              title="Kalıtım Örneği"
            />
            <h4>Örnek Çıktının Adım Adım Açıklaması</h4>
            <ol>
              <li>
                <b>
                  <code>ScavTrap scavTrap("Serena");</code>
                </b>
                : Bu satır, bir <code>ScavTrap</code> nesnesi oluşturur. Ancak <code>ScavTrap</code>,{" "}
                <code>ClapTrap</code>'tan türediği için önce{" "}
                <b>
                  <code>ClapTrap</code>'in kurucusu
                </b>{" "}
                çağrılır. Ardından,{" "}
                <b>
                  <code>ScavTrap</code>'in kendi kurucusu
                </b>{" "}
                çağrılır ve <code>_hitPoints</code>, <code>_energyPoints</code> gibi değerleri günceller.
              </li>
              <li>
                <b>
                  <code>scavTrap.attack("Düşman 1");</code>
                </b>
                : Bu satırda, <code>ScavTrap</code> nesnesi, temel sınıfından miras aldığı{" "}
                <b>
                  <code>attack</code>
                </b>{" "}
                fonksiyonunu kullanır.
              </li>
              <li>
                <b>
                  <code>scavTrap.takeDamage(10);</code>
                </b>
                : Bu satırda da yine temel sınıftan miras alınan{" "}
                <b>
                  <code>takeDamage</code>
                </b>{" "}
                fonksiyonu çağrılır.
              </li>
              <li>
                <b>
                  <code>scavTrap.beRepaired(5);</code>
                </b>
                : Bu satırda da yine temel sınıftan miras alınan{" "}
                <b>
                  <code>beRepaired</code>
                </b>{" "}
                fonksiyonu çağrılır.
              </li>
              <li>
                <b>
                  <code>scavTrap.guardGate();</code>
                </b>
                : Bu satırda, <code>ScavTrap</code>'a özel olarak tanımlanmış{" "}
                <b>
                  <code>guardGate</code>
                </b>{" "}
                fonksiyonu çağrılır.
              </li>
              <li>
                <b>
                  <code>return 0;</code>
                </b>
                : main fonksiyonu bittiğinde nesneler bellekten silinir. Yıkım sırası, yapım sırasının tersidir. Bu
                yüzden önce{" "}
                <b>
                  <code>ScavTrap</code>'in yıkıcısı
                </b>
                , ardından{" "}
                <b>
                  <code>ClapTrap</code>'in yıkıcısı
                </b>{" "}
                çağrılır.
              </li>
            </ol>
          </div>

          <div className="editor-section">
            <h3>✏️ Alıştırma Alanı</h3>
            <p>
              Şimdi bu örnekten yola çıkarak, `ClapTrap` sınıfından kalıtım alan ve <b>FragTrap</b>'a benzeyen yeni bir
              sınıf oluşturun. Bu sınıfın kendine ait özel bir fonksiyonu (`highFivesGuys`) olsun ve kurucu/yıkıcı
              mesajlarını ekrana yazdırsın.
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
          currentCode={freeCode || lessonCode1}
        />
      )}
    </>
  )
}

export default Module03
