import axios from 'axios'

export const translateText = data => async dispatch => {
    const text = encodeURIComponent(data.text)

    const url = `${process.env.REACT_APP_TRANSLATE_API_URL}?key=${process.env.REACT_APP_TRANSLATE_API_KEY}&text=${text}&lang=en-es&format=plain`

    await axios
        .post(`${url}`)
        .then(response => {
            dispatch({
                type: 'TRANSLATE_DATA',
                data: response.data.text[0],
            })
        })
        .catch(error => console.error(error))
}
