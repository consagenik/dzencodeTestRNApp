import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import styles from './ImagePicker.styles';

interface FilePickerProps {
  label: string;
  handleSelect: (value: {fileName: string; filePath: string}) => void;
  value: {fileName: string; filePath: string} | undefined;
  formats: string[];
  error?: string;
}

export default function ImagePicker({
  label,
  handleSelect,
  value,
  formats,
  error,
}: FilePickerProps) {
  return (
    <View style={styles.filePicker}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.selectAvatarWrapper}>
        <TouchableOpacity
          style={styles.selectAvatar}
          onPress={() =>
            launchImageLibrary(
              {
                mediaType: 'photo',
                maxWidth: 320,
                maxHeight: 240,
              },
              response => {
                if (response.assets?.[0]) {
                  handleSelect({
                    filePath: response.assets[0].uri!,
                    fileName: response.assets[0].fileName!,
                  });
                }
              },
            )
          }>
          {value ? (
            <Image style={styles.avatar} source={{uri: value.filePath}} />
          ) : (
            <Text style={styles.imagePlaceholder}>+</Text>
          )}
        </TouchableOpacity>
        <View style={styles.availableFormats}>
          <Text style={styles.availableFormatsDescription}>
            Select on of the following formats:
          </Text>
          <View style={styles.formats}>
            {formats.map(format => (
              <View style={styles.format} key={format}>
                <Text style={styles.formatText}>{format}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.errorWrapper}>{error && <Text>{error}</Text>}</View>
    </View>
  );
}
