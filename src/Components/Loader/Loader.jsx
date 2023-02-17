import { SpinnerDiv } from './Loader.styled';
import { MagnifyingGlass } from 'react-loader-spinner';

export default function loader() {
  return (
    <SpinnerDiv>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </SpinnerDiv>
  );
}
