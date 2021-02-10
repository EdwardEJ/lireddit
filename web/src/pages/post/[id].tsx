import { Box, Heading } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Layout } from '../../components/Layout';
import { usePostQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

// interface [id]Props {

// }

const Post: React.FC<{}> = ({}) => {
	const router = useRouter();
	const intId =
		typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
	const [{ data, fetching, error }] = usePostQuery({
		pause: intId === -1,
		variables: {
			id: intId,
		},
	});
	if (fetching) {
		<Layout>
			<Box>Loading...</Box>
		</Layout>;
	}

	if (error) {
		<Layout>
			<Box>{error.message}</Box>
		</Layout>;
	}

	if (data?.post) {
		return (
			<Layout>
				<Box>Could not find post</Box>
			</Layout>
		);
	}

	return (
		<Layout>
			<Heading mb={4}>{data?.post?.title}</Heading>
			{data?.post?.text}
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
