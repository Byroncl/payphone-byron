import { Product } from '../models/product.model';

export const PHARMACY_PRODUCTS: Product[] = [
  // Analgésicos y Antiinflamatorios
  {
    id: 1,
    nombre: 'Paracetamol 500mg',
    descripcion: 'Analgésico y antipirético. Alivia el dolor leve a moderado y reduce la fiebre.',
    precio: 3.50,
    categoria: 'Analgésicos',
    imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    stock: 150,
    requiereReceta: false
  },
  {
    id: 2,
    nombre: 'Ibuprofeno 400mg',
    descripcion: 'Antiinflamatorio no esteroideo. Alivia dolor, inflamación y fiebre.',
    precio: 5.25,
    categoria: 'Analgésicos',
    imagen: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    stock: 200,
    requiereReceta: false
  },
  {
    id: 3,
    nombre: 'Aspirina 100mg',
    descripcion: 'Ácido acetilsalicílico. Analgésico, antipirético y antiagregante plaquetario.',
    precio: 4.00,
    categoria: 'Analgésicos',
    imagen: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
    stock: 100,
    requiereReceta: false
  },
  {
    id: 4,
    nombre: 'Naproxeno 250mg',
    descripcion: 'Antiinflamatorio de acción prolongada para dolor e inflamación.',
    precio: 6.75,
    categoria: 'Analgésicos',
    imagen: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400',
    stock: 80,
    requiereReceta: false
  },

  // Antibióticos
  {
    id: 5,
    nombre: 'Amoxicilina 500mg',
    descripcion: 'Antibiótico de amplio espectro para infecciones bacterianas.',
    precio: 12.50,
    categoria: 'Antibióticos',
    imagen: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400',
    stock: 75,
    requiereReceta: true
  },
  {
    id: 6,
    nombre: 'Azitromicina 500mg',
    descripcion: 'Antibiótico macrólido para infecciones respiratorias y de piel.',
    precio: 15.00,
    categoria: 'Antibióticos',
    imagen: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
    stock: 60,
    requiereReceta: true
  },
  {
    id: 7,
    nombre: 'Ciprofloxacino 500mg',
    descripcion: 'Antibiótico quinolona para infecciones del tracto urinario.',
    precio: 18.00,
    categoria: 'Antibióticos',
    imagen: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400',
    stock: 50,
    requiereReceta: true
  },

  // Antihistamínicos y Alergias
  {
    id: 8,
    nombre: 'Loratadina 10mg',
    descripcion: 'Antihistamínico de segunda generación para alergias.',
    precio: 8.50,
    categoria: 'Antihistamínicos',
    imagen: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    stock: 120,
    requiereReceta: false
  },
  {
    id: 9,
    nombre: 'Cetirizina 10mg',
    descripcion: 'Antihistamínico para rinitis alérgica y urticaria.',
    precio: 9.00,
    categoria: 'Antihistamínicos',
    imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    stock: 100,
    requiereReceta: false
  },

  // Digestivos
  {
    id: 10,
    nombre: 'Omeprazol 20mg',
    descripcion: 'Inhibidor de la bomba de protones para acidez y reflujo.',
    precio: 7.50,
    categoria: 'Digestivos',
    imagen: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
    stock: 140,
    requiereReceta: false
  },
  {
    id: 11,
    nombre: 'Ranitidina 150mg',
    descripcion: 'Antiácido para úlceras y reflujo gastroesofágico.',
    precio: 6.00,
    categoria: 'Digestivos',
    imagen: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400',
    stock: 90,
    requiereReceta: false
  },
  {
    id: 12,
    nombre: 'Loperamida 2mg',
    descripcion: 'Antidiarreico para control de diarrea aguda.',
    precio: 5.50,
    categoria: 'Digestivos',
    imagen: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400',
    stock: 110,
    requiereReceta: false
  },

  // Vitaminas y Suplementos
  {
    id: 13,
    nombre: 'Vitamina C 1000mg',
    descripcion: 'Suplemento de ácido ascórbico para reforzar el sistema inmune.',
    precio: 10.00,
    categoria: 'Vitaminas',
    imagen: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
    stock: 200,
    requiereReceta: false
  },
  {
    id: 14,
    nombre: 'Complejo B',
    descripcion: 'Vitaminas del complejo B para energía y sistema nervioso.',
    precio: 12.00,
    categoria: 'Vitaminas',
    imagen: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400',
    stock: 150,
    requiereReceta: false
  },
  {
    id: 15,
    nombre: 'Vitamina D3 2000 UI',
    descripcion: 'Suplemento de vitamina D para huesos y sistema inmune.',
    precio: 14.00,
    categoria: 'Vitaminas',
    imagen: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    stock: 130,
    requiereReceta: false
  },
  {
    id: 16,
    nombre: 'Multivitamínico',
    descripcion: 'Complejo multivitamínico y mineral completo.',
    precio: 18.00,
    categoria: 'Vitaminas',
    imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    stock: 100,
    requiereReceta: false
  },

  // Cuidado Personal
  {
    id: 17,
    nombre: 'Alcohol en Gel 500ml',
    descripcion: 'Gel antibacterial con 70% de alcohol para desinfección de manos.',
    precio: 4.50,
    categoria: 'Cuidado Personal',
    imagen: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400',
    stock: 300,
    requiereReceta: false
  },
  {
    id: 18,
    nombre: 'Mascarillas N95 (10 unidades)',
    descripcion: 'Mascarillas de protección respiratoria N95.',
    precio: 25.00,
    categoria: 'Cuidado Personal',
    imagen: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400',
    stock: 150,
    requiereReceta: false
  },
  {
    id: 19,
    nombre: 'Termómetro Digital',
    descripcion: 'Termómetro digital de lectura rápida.',
    precio: 15.00,
    categoria: 'Cuidado Personal',
    imagen: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
    stock: 80,
    requiereReceta: false
  },
  {
    id: 20,
    nombre: 'Tensiómetro Digital',
    descripcion: 'Monitor digital de presión arterial automático.',
    precio: 45.00,
    categoria: 'Cuidado Personal',
    imagen: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
    stock: 50,
    requiereReceta: false
  },

  // Primeros Auxilios
  {
    id: 21,
    nombre: 'Vendas Elásticas',
    descripcion: 'Vendas elásticas para compresión y soporte.',
    precio: 5.00,
    categoria: 'Primeros Auxilios',
    imagen: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400',
    stock: 100,
    requiereReceta: false
  },
  {
    id: 22,
    nombre: 'Curitas (Caja de 50)',
    descripcion: 'Apósitos adhesivos esterilizados variados.',
    precio: 6.00,
    categoria: 'Primeros Auxilios',
    imagen: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    stock: 200,
    requiereReceta: false
  },
  {
    id: 23,
    nombre: 'Algodón 100g',
    descripcion: 'Algodón hidrófilo absorbente esterilizado.',
    precio: 3.00,
    categoria: 'Primeros Auxilios',
    imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    stock: 150,
    requiereReceta: false
  },
  {
    id: 24,
    nombre: 'Alcohol Antiséptico 250ml',
    descripcion: 'Alcohol etílico 70% para desinfección.',
    precio: 4.00,
    categoria: 'Primeros Auxilios',
    imagen: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400',
    stock: 180,
    requiereReceta: false
  },

  // Dermatológicos
  {
    id: 25,
    nombre: 'Protector Solar SPF 50+',
    descripcion: 'Bloqueador solar de amplio espectro.',
    precio: 20.00,
    categoria: 'Dermatológicos',
    imagen: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400',
    stock: 100,
    requiereReceta: false
  },
  {
    id: 26,
    nombre: 'Crema Hidratante',
    descripcion: 'Crema hidratante para piel seca y sensible.',
    precio: 15.00,
    categoria: 'Dermatológicos',
    imagen: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
    stock: 120,
    requiereReceta: false
  },
  {
    id: 27,
    nombre: 'Crema para Dermatitis',
    descripcion: 'Crema corticoide para dermatitis y eczema.',
    precio: 22.00,
    categoria: 'Dermatológicos',
    imagen: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
    stock: 60,
    requiereReceta: true
  },

  // Respiratorios
  {
    id: 28,
    nombre: 'Jarabe para la Tos',
    descripcion: 'Jarabe expectorante y antitusivo.',
    precio: 8.00,
    categoria: 'Respiratorios',
    imagen: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400',
    stock: 90,
    requiereReceta: false
  },
  {
    id: 29,
    nombre: 'Inhalador Salbutamol',
    descripcion: 'Broncodilatador para asma y EPOC.',
    precio: 25.00,
    categoria: 'Respiratorios',
    imagen: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    stock: 70,
    requiereReceta: true
  },
  {
    id: 30,
    nombre: 'Descongestionante Nasal',
    descripcion: 'Spray nasal para aliviar la congestión.',
    precio: 7.50,
    categoria: 'Respiratorios',
    imagen: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    stock: 110,
    requiereReceta: false
  }
];

export const PRODUCT_CATEGORIES = [
  'Todos',
  'Analgésicos',
  'Antibióticos',
  'Antihistamínicos',
  'Digestivos',
  'Vitaminas',
  'Cuidado Personal',
  'Primeros Auxilios',
  'Dermatológicos',
  'Respiratorios'
];
