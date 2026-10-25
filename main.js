
const photos = [
    ["Красивые горы", "nature", "photo-1464822759023-fed622ff2c3b"],
    ["Зелёный лес", "nature", "photo-1448375240586-882707db888b"],
    ["Море", "nature", "photo-1507525428034-b723cf961d3e"],
    ["Закат", "nature", "photo-1472120435266-53107fd0c44a"],
    ["Цветы", "nature", "photo-1490750967868-88aa4486c946"],
    ["Водопад", "nature", "photo-1432405972618-c60b0225b8f9"],
    ["Озеро", "nature", "photo-1439066615861-d1af74d74000"],
    ["Природа", "nature", "photo-1472396961693-142e6e269027"],
    ["Снежные горы", "nature", "photo-1454496522488-7a8e488e8606"],
    ["Пальмы", "nature", "photo-1518837695005-2083093ee35b"],
    ["Зелёные холмы", "nature", "photo-1464278533981-50106e6176b1"],
    ["Пейзаж", "nature", "photo-1500530855697-b586d89ba3ee"],

    ["Спортивная машина", "cars", "photo-1492144534655-ae79c964c9d7"],
    ["Автомобиль", "cars", "photo-1503376780353-7e6692767b70"],
    ["Машина ночью", "cars", "photo-1493238792000-8113da705763"],
    ["Классический автомобиль", "cars", "photo-1503736334956-4c8f8e92946d"],
    ["Авто стиль", "cars", "photo-1489824904134-891ab64532f1"],
    ["Машина на дороге", "cars", "photo-1511919884226-fd3cad34687c"],
    ["Автомобиль мечты", "cars", "photo-1504215680853-026ed2a45def"],
    ["Городская машина", "cars", "photo-1494976388531-d1058494cdd8"],
    ["Авто дизайн", "cars", "photo-1485291571150-772bcfc10da5"],
    ["Машина у моря", "cars", "photo-1519641471654-76ce0107ad1b"],
    ["Авто эстетика", "cars", "photo-1502161254066-6c74afbf07aa"],
    ["Ночной город", "cars", "photo-1519608487953-e999c86e7455"],

    ["Уютная комната", "interior", "photo-1616486338812-3dadae4b4ace"],
    ["Современная гостиная", "interior", "photo-1600210492486-724fe5c67fb0"],
    ["Минимализм", "interior", "photo-1600607687939-ce8a6c25118c"],
    ["Красивая кухня", "interior", "photo-1600585154340-be6161a56a0c"],
    ["Спальня", "interior", "photo-1616486029423-aaa4789e8c9a"],
    ["Рабочее место", "interior", "photo-1497366754035-f200968a6e72"],
    ["Дом мечты", "interior", "photo-1600566753086-00f18fb6b3ea"],
    ["Современный интерьер", "interior", "photo-1600607687920-4e2a09cf159d"],
    ["Уютный уголок", "interior", "photo-1618221195710-dd6b41faaea6"],
    ["Дизайн дома", "interior", "photo-1600210491369-e753d80a41f3"],
    ["Стильная квартира", "interior", "photo-1600566753190-17f0baa2a6c3"],
    ["Светлая комната", "interior", "photo-1600607687644-c7171b42498f"],

    ["Абстрактный арт", "art", "photo-1541961017774-22349e4a1262"],
    ["Галерея", "art", "photo-1579783902614-a3fb3927b6a5"],
    ["Картина", "art", "photo-1577083552431-6e5fd01aa342"],
    ["Творчество", "art", "photo-1513364776144-60967b0f800f"],
    ["Цветное искусство", "art", "photo-1549490349-8643362247b5"],
    ["Арт студия", "art", "photo-1513475382585-d06e58bcb0e0"],
    ["Современное искусство", "art", "photo-1578301978693-85fa9c0320b9"],
    ["Картины и краски", "art", "photo-1460661419201-fd4cecdf8a8b"],
    ["Идеи для рисования", "art", "photo-1515405295579-ba7b45403062"],
    ["Дизайн", "art", "photo-1541701494587-cb58502866ab"],
    ["Искусство цвета", "art", "photo-1547826039-bfc35e0f1ea8"],
    ["Креативные идеи", "art", "photo-1513364776144-60967b0f800f"]
];

const gallery = document.getElementById("gallery");
const search = document.getElementById("search");
const categoryButtons = document.querySelectorAll(".category");

let selectedCategory = "all";

function showPhotos() {
    gallery.innerHTML = "";

    const query = search.value.toLowerCase();

    const filteredPhotos = photos.filter(photo => {
        const matchesName = photo[0].toLowerCase().includes(query);
        const matchesCategory =
            selectedCategory === "all" ||
            photo[1] === selectedCategory;

        return matchesName && matchesCategory;
    });

    filteredPhotos.forEach(photo => {
        const card = document.createElement("article");
        card.className = "pin";

        const img = document.createElement("img");
        img.src = `https://images.unsplash.com/${photo[2]}?auto=format&fit=crop&w=600&q=80`;
        img.alt = photo[0];
        img.loading = "lazy";

        const info = document.createElement("div");
        info.className = "pin-info";

        const title = document.createElement("h3");
        title.textContent = photo[0];

        const save = document.createElement("button");
        save.className = "save";
        save.textContent = "Сохранить";

        save.addEventListener("click", () => {
            save.classList.toggle("saved");
            save.textContent = save.classList.contains("saved")
                ? "Сохранено"
                : "Сохранить";
        });

        info.append(title, save);
        card.append(img, info);
        gallery.append(card);
    });

    if (filteredPhotos.length === 0) {
        gallery.textContent = "Ничего не найдено";
    }
}

search.addEventListener("input", showPhotos);

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(item =>
            item.classList.remove("active")
        );

        button.classList.add("active");
        selectedCategory = button.dataset.category;
        showPhotos();
    });
});

document.getElementById("homeBtn").addEventListener("click", () => {
    search.value = "";
    selectedCategory = "all";

    categoryButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.category === "all"
        );
    });

    showPhotos();
});

showPhotos();
