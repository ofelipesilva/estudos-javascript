const form = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const dayNight = document.querySelector('.card .time');
const icon = document.querySelector('.icon img');

const changeUI = (info) => {
    const {cityDets, weather} = info;

    details.innerHTML = `
        <div class="text-muted text-uppercase text-center details">
            <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
        </div>
    `;

    icon.src = `./img/icons/${weather.WeatherIcon}.svg`;

    if (weather.IsDayTime){
        dayNight.src = './img/day.svg';
    } else{
        dayNight.src = './img/night.svg';
    }

    if (card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getConditions(cityDets.Key);

    return {cityDets, weather};
};

form.addEventListener('submit', event => {
    event.preventDefault();

    const cityName = form.city.value;
    form.reset();
    
    // getCity(cityName)
    //     .then(data  => getConditions(data.Key))
    //     .then(data => changeUI(cityName, data.WeatherText, data.Temperature.Metric.Value))
    //     .catch(err => console.log(err));

    updateCity(cityName)
        .then(data => changeUI(data))
        .catch(err => console.log(err));
});
