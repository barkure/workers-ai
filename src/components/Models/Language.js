const langs = [
    {
        "label": "Afrikaans",
        "value": "af"
    },
    {
        "label": "Amharic",
        "value": "am"
    },
    {
        "label": "Arabic",
        "value": "ar"
    },
    {
        "label": "Asturian",
        "value": "ast"
    },
    {
        "label": "Azerbaijani",
        "value": "az"
    },
    {
        "label": "Bashkir",
        "value": "ba"
    },
    {
        "label": "Belarusian",
        "value": "be"
    },
    {
        "label": "Bulgarian",
        "value": "bg"
    },
    {
        "label": "Bengali",
        "value": "bn"
    },
    {
        "label": "Breton",
        "value": "br"
    },
    {
        "label": "Bosnian",
        "value": "bs"
    },
    {
        "label": "Catalan; Valencian",
        "value": "ca"
    },
    {
        "label": "Cebuano",
        "value": "ceb"
    },
    {
        "label": "Czech",
        "value": "cs"
    },
    {
        "label": "Welsh",
        "value": "cy"
    },
    {
        "label": "Danish",
        "value": "da"
    },
    {
        "label": "German",
        "value": "de"
    },
    {
        "label": "Greeek",
        "value": "el"
    },
    {
        "label": "English",
        "value": "en"
    },
    {
        "label": "Spanish",
        "value": "es"
    },
    {
        "label": "Estonian",
        "value": "et"
    },
    {
        "label": "Persian",
        "value": "fa"
    },
    {
        "label": "Fulah",
        "value": "ff"
    },
    {
        "label": "Finnish",
        "value": "fi"
    },
    {
        "label": "French",
        "value": "fr"
    },
    {
        "label": "Western Frisian",
        "value": "fy"
    },
    {
        "label": "Irish",
        "value": "ga"
    },
    {
        "label": "Gaelic; Scottish Gaelic",
        "value": "gd"
    },
    {
        "label": "Galician",
        "value": "gl"
    },
    {
        "label": "Gujarati",
        "value": "gu"
    },
    {
        "label": "Hausa",
        "value": "ha"
    },
    {
        "label": "Hebrew",
        "value": "he"
    },
    {
        "label": "Hindi",
        "value": "hi"
    },
    {
        "label": "Croatian",
        "value": "hr"
    },
    {
        "label": "Haitian; Haitian Creole",
        "value": "ht"
    },
    {
        "label": "Hungarian",
        "value": "hu"
    },
    {
        "label": "Armenian",
        "value": "hy"
    },
    {
        "label": "Indonesian",
        "value": "id"
    },
    {
        "label": "Igbo",
        "value": "ig"
    },
    {
        "label": "Iloko",
        "value": "ilo"
    },
    {
        "label": "Icelandic",
        "value": "is"
    },
    {
        "label": "Italian",
        "value": "it"
    },
    {
        "label": "Japanese",
        "value": "ja"
    },
    {
        "label": "Javanese",
        "value": "jv"
    },
    {
        "label": "Georgian",
        "value": "ka"
    },
    {
        "label": "Kazakh",
        "value": "kk"
    },
    {
        "label": "Central Khmer",
        "value": "km"
    },
    {
        "label": "Kannada",
        "value": "kn"
    },
    {
        "label": "Korean",
        "value": "ko"
    },
    {
        "label": "Luxembourgish; Letzeburgesch",
        "value": "lb"
    },
    {
        "label": "Ganda",
        "value": "lg"
    },
    {
        "label": "Lingala",
        "value": "ln"
    },
    {
        "label": "Lao",
        "value": "lo"
    },
    {
        "label": "Lithuanian",
        "value": "lt"
    },
    {
        "label": "Latvian",
        "value": "lv"
    },
    {
        "label": "Malagasy",
        "value": "mg"
    },
    {
        "label": "Macedonian",
        "value": "mk"
    },
    {
        "label": "Malayalam",
        "value": "ml"
    },
    {
        "label": "Mongolian",
        "value": "mn"
    },
    {
        "label": "Marathi",
        "value": "mr"
    },
    {
        "label": "Malay",
        "value": "ms"
    },
    {
        "label": "Burmese",
        "value": "my"
    },
    {
        "label": "Nepali",
        "value": "ne"
    },
    {
        "label": "Dutch; Flemish",
        "value": "nl"
    },
    {
        "label": "Norwegian",
        "value": "no"
    },
    {
        "label": "Northern Sotho",
        "value": "ns"
    },
    {
        "label": "Occitan",
        "value": "post 1500"
    },
    {
        "label": "Oriya",
        "value": "or"
    },
    {
        "label": "Panjabi; Punjabi",
        "value": "pa"
    },
    {
        "label": "Polish",
        "value": "pl"
    },
    {
        "label": "Pushto; Pashto",
        "value": "ps"
    },
    {
        "label": "Portuguese",
        "value": "pt"
    },
    {
        "label": "Romanian; Moldavian; Moldovan",
        "value": "ro"
    },
    {
        "label": "Russian",
        "value": "ru"
    },
    {
        "label": "Sindhi",
        "value": "sd"
    },
    {
        "label": "Sinhala; Sinhalese",
        "value": "si"
    },
    {
        "label": "Slovak",
        "value": "sk"
    },
    {
        "label": "Slovenian",
        "value": "sl"
    },
    {
        "label": "Somali",
        "value": "so"
    },
    {
        "label": "Albanian",
        "value": "sq"
    },
    {
        "label": "Serbian",
        "value": "sr"
    },
    {
        "label": "Swati",
        "value": "ss"
    },
    {
        "label": "Sundanese",
        "value": "su"
    },
    {
        "label": "Swedish",
        "value": "sv"
    },
    {
        "label": "Swahili",
        "value": "sw"
    },
    {
        "label": "Tamil",
        "value": "ta"
    },
    {
        "label": "Thai",
        "value": "th"
    },
    {
        "label": "Tagalog",
        "value": "tl"
    },
    {
        "label": "Tswana",
        "value": "tn"
    },
    {
        "label": "Turkish",
        "value": "tr"
    },
    {
        "label": "Ukrainian",
        "value": "uk"
    },
    {
        "label": "Urdu",
        "value": "ur"
    },
    {
        "label": "Uzbek",
        "value": "uz"
    },
    {
        "label": "Vietnamese",
        "value": "vi"
    },
    {
        "label": "Wolof",
        "value": "wo"
    },
    {
        "label": "Xhosa",
        "value": "xh"
    },
    {
        "label": "Yiddish",
        "value": "yi"
    },
    {
        "label": "Yoruba",
        "value": "yo"
    },
    {
        "label": "Chinese",
        "value": "zh"
    },
    {
        "label": "Zulu",
        "value": "zu"
    }
];

export default langs;