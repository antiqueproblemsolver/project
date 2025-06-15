import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, ShoppingCart, Heart } from 'lucide-react-native';
import { Product } from '@/types/api';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  isFavorite: boolean;
}

export default function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const getDiscountedPrice = () => {
    if (product.discountPercentage > 0) {
      const discounted = product.price * (1 - product.discountPercentage / 100);
      return discounted;
    }
    return product.price;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {!imageError ? (
          <Image 
            source={{ uri: product.thumbnail }} 
            style={styles.productImage}
            onError={handleImageError}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite(product)}
        >
          <Heart 
            size={18} 
            color={isFavorite ? '#E41E3F' : '#FFFFFF'} 
            strokeWidth={2}
            fill={isFavorite ? '#E41E3F' : 'none'}
          />
        </TouchableOpacity>

        {product.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{Math.round(product.discountPercentage)}%</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color="#FFA500" strokeWidth={2} fill="#FFA500" />
          <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          <Text style={styles.stock}>({product.stock} in stock)</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>{formatPrice(getDiscountedPrice())}</Text>
          {product.discountPercentage > 0 && (
            <Text style={styles.originalPrice}>{formatPrice(product.price)}</Text>
          )}
        </View>

        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => onAddToCart(product)}
        >
          <ShoppingCart size={16} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F2F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#E41E3F',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  brand: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#65676B',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1C1E21',
    marginBottom: 8,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#1C1E21',
    marginLeft: 4,
    marginRight: 8,
  },
  stock: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1877F2',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#65676B',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1877F2',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  addToCartText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 6,
  },
});